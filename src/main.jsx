import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {Urls} from "./Urls.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <main>
    <RouterProvider router={ Urls }/>
  </main>
  // </React.StrictMode>,
)
