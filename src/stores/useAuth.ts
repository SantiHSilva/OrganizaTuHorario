import { create } from 'zustand'
import { authService } from '../api/api';
import { storage_access_token, storage_refresh_token } from '../api/constants';

interface AuthStore {
  checkedLogin: boolean;
  isLogged: boolean;
  access_token: string;
  refresh_token: string;
  checkLoginStatus: () => Promise<void>;
  setTokens: (access: string, refresh: string) => void;
  clearAuth: () => void;
}

export const useAuth = create<AuthStore>()((set, get) => ({
  checkedLogin: false,
  isLogged: false,
  access_token: localStorage.getItem(storage_access_token) || '',
  refresh_token: localStorage.getItem(storage_refresh_token) || '',

  checkLoginStatus: async () => {
    // Evitar múltiples verificaciones si ya se hizo
    if (get().checkedLogin) return;

    set({ checkedLogin: true });

    const { access_token, refresh_token } = get();
    
    // Si no hay tokens, no está logueado
    if (!access_token || !refresh_token) {
      set({ isLogged: false });
      return;
    }

    try {
      // Verificar si el token es válido
      await authService.getProfile();
      set({ isLogged: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ 
        isLogged: false,
        access_token: '',
        refresh_token: '' 
      });
      localStorage.removeItem(storage_access_token);
      localStorage.removeItem('refresh_token');
    }
  },

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(storage_access_token, access);
    localStorage.setItem(storage_refresh_token, refresh);
    set({ 
      access_token: access,
      refresh_token: refresh,
      isLogged: true 
    });
  },

  clearAuth: () => {
    localStorage.removeItem(storage_access_token);
    localStorage.removeItem(storage_refresh_token);
    set({
      access_token: '',
      refresh_token: '',
      isLogged: false,
      checkedLogin: true
    });
  }
}));