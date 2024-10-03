import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/Database/firebase";

const initialState = {
  products: {},
  status: "idle",
  error: null,
  favoriteProductIds: [], // Add state to store favorite product IDs
  favoritesStatus: "idle", // Add state to track favorite fetch status
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const productCollection = collection(db, "products");
    const productSnapshot = await getDocs(query(productCollection));
    const productList = productSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = {
        ...doc.data(),
        isFavorite: doc.data().isFavorite || false,
      };
      return acc;
    }, {});
    return productList;
  }
);

export const fetchFavoriteProductIds = createAsyncThunk(
  "products/fetchFavoriteProductIds",
  async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData?.favorites || [];
      } else {
        console.error("User document does not exist.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching user favorites: ", error);
      return [];
    }
  }
);

export const fetchProductsByIds = createAsyncThunk(
  "products/fetchProductsByIds",
  async (productIds: string[]) => {
    if (productIds.length === 0) return {};

    const productCollection = collection(db, "products");
    const q = query(productCollection, where("__name__", "in", productIds));
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data();
      return acc;
    }, {});
    return productList;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFavoriteProductIds.pending, (state) => {
        state.favoritesStatus = "loading";
      })
      .addCase(fetchFavoriteProductIds.fulfilled, (state, action) => {
        state.favoritesStatus = "succeeded";
        state.favoriteProductIds = action.payload;
        // Trigger fetching of products based on favorite IDs
        if (action.payload.length > 0) {
          state.status = "loading";
        }
      })
      .addCase(fetchFavoriteProductIds.rejected, (state, action) => {
        state.favoritesStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
