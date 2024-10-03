import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "@/redux/store/store"; // Adjust path if necessary
import { fetchProducts } from "@/redux/productSlice";
import ProductDescription from "@/components/custom/Product/ProductDescription";
import ProductDetails from "@/components/custom/Product/ProductDetails";
import ProductImage from "@/components/custom/Product/ProductImage";
import { useEffect, useState } from "react";
import Loader from "@/Admin/common/Loader";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // @ts-ignore
  const product = products[id];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]); // Set default color if available
    }
  }, [product]);

  if (status === "loading")
    return (
      <p>
        {" "}
        <Loader />
      </p>
    );
  if (!product) return <p>Product not found</p>;

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="px-6 flex gap-4 lg:flex-row flex-col p-3">
        <ProductImage selectedColor={selectedColor} product={product} />
        <div className="h-full lg:w-[50%] float-end">
          <ProductDetails
            // @ts-ignore
            product={product}
            handleColorChange={handleColorChange}
          />
        </div>
      </div>
      <div className="px-6 p-3">
        <ProductDescription product={product} />
      </div>
    </>
  );
};

export default Product;
