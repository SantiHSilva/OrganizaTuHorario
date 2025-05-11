import { createRoot } from 'react-dom/client'
import './styles/index.css';
import { RouterProvider  } from "react-router";
import { router } from './router/router.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <main>
    <RouterProvider router={router} />
    <ToastContainer />
  </main>
)
