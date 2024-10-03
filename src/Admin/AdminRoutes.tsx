import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/satoshi.css";
import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import ECommerce from "./pages/Dashboard/ECommerce";

import DefaultLayout from "./layout/DefaultLayout";
import "./css/style.css";
import Orders from "./pages/Orders/Orders";
import Users from "./pages/Users/Users";
import AddProduct from "./pages/Manage Products/AddProduct";
import AllProducts from "./pages/Manage Products/AllProducts";
import EditProduct from "./pages/Manage Products/EditProduct";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./PrivateRoutes";

function AdminRoutes() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <DefaultLayout>
        <Routes>
          <Route
            index
            element={
              <PrivateRoute>
                <>
                  <PageTitle title="eCommerce Dashboard | Admin" />
                  <ECommerce />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <>
                  <PageTitle title="Profile | Admin" />
                  <Orders />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <>
                  <PageTitle title="Profile | Admin" />
                  <Users />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <PrivateRoute>
                <>
                  <PageTitle title="Profile | Admin" />
                  <AddProduct />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-products"
            element={
              <PrivateRoute>
                <>
                  <PageTitle title="Profile | Admin" />
                  <AllProducts />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-product/:productId"
            element={
              <PrivateRoute>
                <>
                  <PageTitle title="Profile | Admin" />
                  <EditProduct />
                </>
              </PrivateRoute>
            }
          />

          <Route
            path="auth/signin"
            element={
              <>
                <PageTitle title="Signin | Admin" />
                <SignIn />
              </>
            }
          />
        </Routes>
      </DefaultLayout>
    </AuthProvider>
  );
}

export default AdminRoutes;
