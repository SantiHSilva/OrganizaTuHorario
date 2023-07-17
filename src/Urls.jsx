import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home.jsx";
import ToDo from "./Components/OldComponents/ToDo.jsx";
import DynamicPage from "./Components/OldComponents/DynamicPage.jsx";
import TestPage from "./Components/OldComponents/TestingTimestamps.jsx";
import Datos from "./Components/OldComponents/Datos.jsx";
import Modal from "./Components/CrearGrupoModal.jsx";

export const Urls = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
    },
    {
        path: "/modal",
        element: <Modal />
    }
]);