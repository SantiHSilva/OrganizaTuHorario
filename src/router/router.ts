import {
  createBrowserRouter,
} from "react-router";
import Welcome from "../context/Welcome";
import Login from "../context/auth/Login";
import Register from "../context/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/register",
    Component: Register
  }
]);
