import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home.jsx";
import ToDo from "./Utils/OldComponents/ToDo.jsx";
import DynamicPage from "./Utils/OldComponents/DynamicPage.jsx";
import TestPage from "./Utils/OldComponents/TestingTimestamps.jsx";
import Datos from "./Utils/OldComponents/Datos.jsx";
import Modal from "./Components/Modals/CrearGrupoModal.jsx";

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