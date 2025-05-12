import axios from "axios";
import { storage_access_token, storage_refresh_token } from "./constants";
import { toast } from 'react-toastify';

const API_URL = "http://localhost:3000/";

interface LoginParams {
  email: string;
  password: string;
}

interface SigupParams {
  nombre: string;
  apellido: string;
  sexo: boolean;
  nacionalidad_id: number;
  telefono: string;
  direccion_notificacion: string;
  direccion_domicilio: string;
  email: string;
  password: string;
}

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

class AuthService {
  private API = API

  constructor() {
    // Configurar el interceptor para agregar el token de acceso a las solicitudes
    this.API.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(storage_access_token);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Agregar interceptor para manejar el refresco de tokens
    this.API.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y la solicitud original no se ha reintentado
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const refreshToken = localStorage.getItem(storage_refresh_token);
          if (refreshToken) {
            try {
              const { data } = await this.API.post('auth/refresh', {
                refreshToken
              });

              localStorage.setItem(storage_access_token, data.newAccessToken);
              this.API.defaults.headers.Authorization = `Bearer ${data.newAccessToken}`;

              return this.API(originalRequest);
            } catch (refreshError) {
              console.error('Error refreshing token:', refreshError);
              // Aquí puedes manejar el error de refresco (por ejemplo, logout del usuario)
              return Promise.reject(refreshError);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async login(loginParams: LoginParams) {
    try {
      const response = await this.API.post('auth/login', loginParams);
      const data = response.data;

      if (data.access_token) {
        localStorage.setItem(storage_access_token, data.access_token);
        toast.success('Inicio de sesión exitoso');
      }

      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      return data;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  }

  async signup(siginParams: SigupParams) {
    try {
      const response = await this.API.post(
        'auth/register',
        siginParams
      );
      const data = response.data;

      if (!data) {
        toast.error('Error en el registro');
        throw new Error('Error en el registro');
      }

      window.location.href = '/login';
      toast.success('Registro exitoso. Por favor, inicia sesión.');
      return data;
    } catch (error) {
      toast.error('Error en el registro');
      console.error('Error en el signup:', error);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await this.API.post('auth/logout', {
        "refreshToken": localStorage.getItem(storage_refresh_token) || "",
        "accessToken": localStorage.getItem(storage_access_token) || ""
      });
      const data = response.data;

      if (!data) {
        toast.error('Error en el cierre de sesión');
        throw new Error('Error en el cierre de sesión');
      }

      localStorage.removeItem('token');
      toast.success('Cierre de sesión exitoso');
      return data;
    } catch (error) {
      toast.error('Error en el cierre de sesión');
      console.error('Error en el logout:', error);
      throw error;
    }
  }

  async getProfile() {
    // peticion get a la ruta /auth/profile
    try {
      const response = await this.API.get('auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = response.data;

      if (!data) {
        toast.error('Error al obtener el perfil');
        throw new Error('Error al obtener el perfil');
      }

      return data;
    } catch (error) {
      toast.error('Error al obtener el perfil');
      console.error('Error en el getProfile:', error);
      throw error;
    }
  }

  // Método para el inicio de sesión con Google
  async googleLogin() {
    try {
      const token = localStorage.getItem('googleToken');
      const response = await this.API.post('auth/google', {
        idToken: token
      });
      const data = response.data;

      if (data?.access_token && data?.refresh_token) {
        localStorage.setItem(storage_access_token, data.access_token);
        localStorage.setItem(storage_refresh_token, data.refresh_token);
        toast.success('Inicio de sesión exitoso');
        window.location.href = '/app/dashboard';
      } else if (data.statusCode === 409) {
        this.handleUserNotFound();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
        this.handleUserNotFound();
      } else {
        toast.error('Error en el inicio de sesión con Google');
        console.error('Error en googleLogin:', error);
      }
    }
  }

  // Método para el registro con Google
  async googleRegister({
    nacionalidadId,
    sexo
  }: {
    nacionalidadId: number;
    sexo: boolean;
  }) {
    try {
      const token = localStorage.getItem('googleToken');
      const response = await this.API.post('auth/google/register', {
        idToken: token,
        nacionalidad_id: nacionalidadId,
        sexo
      });
      const data = response.data;

      console.log(data);

      if (data?.access_token && data?.refresh_token) {
        localStorage.setItem(storage_access_token, data.access_token);
        localStorage.setItem(storage_refresh_token, data.refresh_token);
        toast.success('Registro exitoso. Inicio de sesión completado');
        window.location.href = '/app/dashboard';
      } else if (data.statusCode === 500) {
        this.handleRegisterError(data.message);
      }
    } catch (error: unknown) {
      this.handleRegisterError('Error en el registro con Google');
      if (axios.isAxiosError(error) && error.response && error.response.status === 500) {
        toast.info('Prueba con otro método de inicio de sesión');
        console.error('Error en googleRegister:', error);
        window.location.href = '/login';
      }
      console.error('Error en googleRegister:', error);
    }
  }

  // Manejo de redirección cuando el usuario no está registrado
  private handleUserNotFound() {
    toast.info('Usuario no registrado. Redirigiendo al registro...');
    window.location.href = '/google/register';
  }

  // Manejo de errores específicos en el registro
  private handleRegisterError(message: string) {
    toast.error(message || 'Error en el registro');
    toast.info('Prueba con otro método de inicio de sesión');
    window.location.href = '/login';
  }
}

export const authService = new AuthService();