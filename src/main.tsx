import { createRoot } from 'react-dom/client'
import './styles/index.css';
import { RouterProvider  } from "react-router";
import { router } from './router/router.tsx';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='151162601871-t5bqhf6a178frcfv4th7ulpbf8q8epc5.apps.googleusercontent.com'>
    <main>
      <RouterProvider router={router} />
      <ToastContainer />
    </main>
  </GoogleOAuthProvider>
)
