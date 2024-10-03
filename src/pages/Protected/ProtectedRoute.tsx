import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/Database/firebase";
import Loader from "@/Admin/common/Loader";

interface ProtectedRouteProps {
  element: React.ReactElement;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requireAuth = true,
}) => {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <div>
        {" "}
        <Loader />
      </div>
    );

  if (user && !requireAuth) return <Navigate to="/" />;
  if (!user && requireAuth) return <Navigate to="/login" />;

  return element;
};

export default ProtectedRoute;
