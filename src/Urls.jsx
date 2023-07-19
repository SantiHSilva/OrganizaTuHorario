import { createBrowserRouter } from "react-router-dom";
import ToDo from "./Utils/OldComponents/ToDo.jsx";
import DynamicPage from "./Utils/OldComponents/DynamicPage.jsx";
import TestPage from "./Utils/OldComponents/TestingTimestamps.jsx";
import Datos from "./Utils/OldComponents/Datos.jsx";
import App from "./App.jsx";

export const Urls = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/todo",
        element: <ToDo />,
    },
    {
        path: "/:id/:name",
        element: <DynamicPage />
    },
    {
        path: "/test",
        element: <TestPage />
    },
    {
        path: "/datos",
        element: <Datos />
    }
]);