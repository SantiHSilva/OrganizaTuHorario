import { useAuth } from "../stores/useAuth";
import { JSX, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  useEffect(() => {
    if(!auth.checkedLogin) {
      auth.checkLoginStatus();
    }
  }, []);
  auth.forceToLogin = true;
  return children;
};

export default ProtectedRoute;