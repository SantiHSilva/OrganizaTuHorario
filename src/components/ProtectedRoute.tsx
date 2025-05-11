import { useAuth } from "../stores/useAuth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  console.log('auth', auth);

  auth.forceToLogin = true;
  auth.checkLoginStatus();

  return children;
};

export default ProtectedRoute;