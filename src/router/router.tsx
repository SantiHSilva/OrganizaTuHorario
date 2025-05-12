import {
  createBrowserRouter,
  RouteObject,
} from "react-router";
import Welcome from "../pages/Welcome";
import ProtectedRoute from "../components/ProtectedRoute";
import ViewMySchedules from "../pages/ViewMySchedules";
import ScheduleDetails from "../pages/ScheduleDetails";

type RouteMiddleware = RouteObject & {
  middleware?: boolean;
};

const routes : RouteMiddleware[] = [
  {
    path: "/",
    Component: Welcome,
    middleware: false,
  },
  {
    path: "schedules",
    Component: ViewMySchedules,
    middleware: true,
  },
  {
    path: "schedules/:id",
    Component: ScheduleDetails,
    middleware: true,
  }
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
