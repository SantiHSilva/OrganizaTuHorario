import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Modal } from "../../components/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { authService } from "../../api/api";
import { useAuth } from "../../stores/useAuth";
import MyProfile from "./MyProfile";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from '@react-oauth/google';
import { getProfileIconGoogle } from "../../libs/utils";
import { storage_profile_icon } from "../../api/constants";

export default function AuthController(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth()
  const [ignoreAuth, setIgnoreAuth] = useState(false) // Si la autentificación es obligatoria o no

  useEffect(() => {
    if(auth.checkedLogin) {
      auth.checkLoginStatus()
    }
    console.log(auth.profile)
  }, [auth.checkedLogin, auth])

  useEffect(() => {
    console.log(auth.forceToLogin, auth.isLogged, auth.checkedLogin)
    if(auth.forceToLogin && !auth.isLogged && auth.checkedLogin){
      setIgnoreAuth(true)
      setIsModalOpen(true);
    } else {
      setIgnoreAuth(false)
      setIsModalOpen(false);
    }
  }, [auth.forceToLogin, auth.isLogged, auth.checkedLogin])

  async function handleLogin(){
    
    // Validate email and password
    if(!email || !password){
      toast.error("Por favor, ingrese su correo electrónico y contraseña.");
      return;
    }

    // Call the login API
    await authService.login({ email, password })
      .then((response) => {
        setIsModalOpen(false);
        auth.setTokens(response.access_token, response.refresh_token)
        setEmail("");
        setPassword("");
      })
  }

  async function handleLoginGoogle(credential: string){
    await authService.googleLogin(credential)
      .then((response) => {
        setIsModalOpen(false);
        auth.setTokens(response.access_token, response.refresh_token)
        setEmail("");
        setPassword("");
        localStorage.setItem(storage_profile_icon, getProfileIconGoogle(credential) || "");
      })
  }

  return (
    <>
      {
        auth.isLogged && auth.profile ? (
          <MyProfile />
        ) : (
          <button 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <FaUserAlt className="text-2xl text-gray-800 dark:text-white" />
          </button>
        )
      }

      <Modal isOpen={isModalOpen} onClose={() => {
        if(!ignoreAuth) setIsModalOpen(false)
      }}>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Iniciar Sesión
            </h3>
            {
              !ignoreAuth && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <span className="sr-only">Cerrar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) 
            }
          </div>
          <section className="flex justify-center items-center gap-2 mt-5">
            <GoogleLogin
              size="large"
              locale="es"
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                handleLoginGoogle(credentialResponse.credential as string);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />;
          </section>
          <section className="flex items-center justify-center mt-4 gap-2">
            <hr className="my-4 w-full border-gray-400 dark:border-[#3c434d]" />
            <p className="text-gray-500 dark:text-gray-400">O</p>
            <hr className="my-4 w-full border-gray-400 dark:border-[#3c434d]" />
          </section>
          <div className="mt-4">
            <section>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300 required">
                Correo Electrónico
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-[#0b0c10] dark:border-[#3c434d] dark:text-white"
                placeholder="Ingrese su usuario"
              />
            </section>
            <section className="mt-4">
              <label htmlFor="password" className="block text-base font-medium text-gray-700 dark:text-gray-300 required">
                Contraseña
              </label>
              <section className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-[#0b0c10] dark:border-[#3c434d] dark:text-white"
                  placeholder="Ingrese su contraseña"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {
                    showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )
                  }
                </button>
              </section>

            </section>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            {
              !ignoreAuth && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancelar
                </button>
              )
            }
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}