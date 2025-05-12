import { useAuth } from "../stores/useAuth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  auth.forceToLogin = true;
  return children;
};

export default ProtectedRoute;