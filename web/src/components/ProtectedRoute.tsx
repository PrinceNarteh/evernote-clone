import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../helper/auth";

const ProtectedRoute = () => {
  const isAuth = isAuthenticated();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default ProtectedRoute;
