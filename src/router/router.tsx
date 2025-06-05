import {
  createBrowserRouter,
  RouteObject,
} from "react-router";
import Welcome from "../pages/Welcome";
import ProtectedRoute from "../components/ProtectedRoute";
import ViewMySchedules from "../pages/ViewMySchedules";
import ScheduleDetails from "../pages/ScheduleDetails";
import ScrappingYoutube from "../pages/ScrappingYoutube";
import ScrappingWAV from "../pages/ScrappingWAV";
import SchedulePublic from "../pages/SchedulePublic";
import Administration from "../pages/Administration";

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
  },
  {
    path: "view/:id",
    Component: SchedulePublic,
    middleware: true,
  },
  {
    path: "scrapping",
    Component: ScrappingYoutube,
    middleware: false,
  },
  {
    path: "scrapping-wav",
    Component: ScrappingWAV,
    middleware: false,
  },
  {
    path: "admin",
    Component: Administration,
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
