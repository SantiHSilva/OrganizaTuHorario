import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {Urls} from "./Urls.jsx";
import { theme } from './Utils/GlobalVars.js';

document.documentElement.setAttribute('data-bs-theme', theme) // Bootstrap 5

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <main>
    <RouterProvider router={ Urls }/>
  </main>
  // </React.StrictMode>,
)
