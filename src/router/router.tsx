import {
  createBrowserRouter,
  RouteObject,
} from "react-router";
import Welcome from "../pages/Welcome";
import ProtectedRoute from "../components/ProtectedRoute";

type RouteMiddleware = RouteObject & {
  middleware?: boolean;
};

const routes : RouteMiddleware[] = [
  {
    path: "/",
    Component: Welcome,
    middleware: true,
  },
]

export const router = createBrowserRouter(routes.map((route) => {
  return {
    ...route,
    Component: () => (
      route.middleware && route.middleware === true ? (
        <ProtectedRoute>
          {/* @ts-expect-error XDD */}
          <route.Component />
        </ProtectedRoute>
      ) : (
        <>
          {/* @ts-expect-error XDD */}
          <route.Component />
        </>
      )
    ),
  }
}))
