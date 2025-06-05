import { useEffect } from "react";
import { router } from "../../router/router";
import { useAuth } from "../../stores/useAuth";
import AuthController from "../auth/AuthController";
import DropdownMenu from "./DropdownMenu";
import ThemeToggle from "./ThemeMode";
import { IoChevronDown } from "react-icons/io5";
import { Profile } from "../../interfaces/account";

interface MenusItems{
  label: string;
  action?: () => void;
  items?: MenusItems[];
  requireLogin: boolean;
  onlyAdmin?: boolean;
  permissions?: string[];
}

const menuItems: MenusItems[] = [
  {
    label: '📅 Mis Horarios',
    action: () => router.navigate('/schedules'),
    requireLogin: true
  },
  {
    label: '📺 Scrapping Youtube',
    action: () => router.navigate('/scrapping'),
    requireLogin: true,
  },
  {
    label: '🎵 Scrapping WAV',
    action: () => router.navigate('/scrapping-wav'),
    requireLogin: true
  },
  {
    label: '🔰 Administración',
    requireLogin: true,
    onlyAdmin: true,
    action: () => router.navigate('/admin'),
  },
];

export default function HeaderBar() {

  const user = useAuth();

  useEffect(() => {
    user.checkLoginStatus()
  }, []);

  function currentUserIsAdmin() {
    if(!user.profile) return false;
    const profile: Profile = user.profile;
    const permisos = profile.Roles.Permisos || [];
    console.log(permisos)
    if (permisos.length === 0) return false;
    let isAdmin = true; // hasta que demuestre lo contrario
    permisos.forEach(permiso => {
      console.log('checking permiso', permiso)
      if (!permiso.agregar || !permiso.eliminar || !permiso.modificar || !permiso.leer){
        isAdmin = false; // If any permission is false, user is not admin
      }
    })
    return isAdmin; // Return true if all permissions are true
  }

  const newMenusBar = menuItems.filter(item => {
    if (item.requireLogin && !user.isLogged) return false; // Exclude if login is required and user is not logged in
    if (item.onlyAdmin && !currentUserIsAdmin()) return false; // Exclude if only admin and user is not admin
    return true; 
  })

  return (
    <div className="bg-gray-100 dark:bg-[#1f2128] shadow-lg rounded-b-4xl p-4 md:px-20">
      <section className="max-w-screen-xl w-full mx-auto flex justify-between items-center">
        <a className="px-2 flex flex-row items-center gap-2.5">
          <img src="/icon.png" className="w-10 h-auto" alt="" />
          <section className="flex flex-row gap-3 items-center">
            <h1 className="text-2xl text-gray-800 dark:text-white hidden md:block">
              Organiza Tu Horario
            </h1>
            <h1 className="text-2xl text-gray-800 dark:text-white md:hidden">
              OTH
            </h1>

            {/* Dropdown */}
            {newMenusBar && newMenusBar.length > 0 && (
              <>
                <p className="text-gray-500 dark:text-gray-400   text-2xl">
                  /
                </p>
                <DropdownMenu
                  openOnHover
                  items={newMenusBar}
                >
                  <button className="rounded-full cursor-pointer flex flex-row gap-2 items-center">
                    <p className="text-gray-800 dark:text-white text-2xl">
                      Menú
                    </p>
                    <IoChevronDown className="text-gray-800 dark:text-white text-2xl pt-1" />
                  </button>
                </DropdownMenu>
              </>
              )
            }
          </section>
        </a>
        <section className="flex flex-row items-center md:gap-3">
          <AuthController />
          <ThemeToggle />
        </section>
      </section>
    </div>
  )
}