import { createHashRouter } from "react-router-dom";
import ToDo from "./Utils/OldComponents/ToDo.jsx";
import DynamicPage from "./Utils/OldComponents/DynamicPage.jsx";
import TestPage from "./Utils/OldComponents/TestingTimestamps.jsx";
import Datos from "./Utils/OldComponents/Datos.jsx";
import App from "./App.jsx";
import ImportGroupList from "./Components/Import/ImportGroupList.jsx";

export const Urls = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/todo",
        element: <ToDo />,
    },
    {
        path: "/import",
        element: <ImportGroupList />,
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
    },
]);