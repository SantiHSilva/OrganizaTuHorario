import { router } from "../../router/router";
import AuthController from "../auth/AuthController";
import DropdownMenu from "./DropdownMenu";
import ThemeToggle from "./ThemeMode";
import { IoChevronDown } from "react-icons/io5";

const menuItems = [
  {
    label: '📅 Mis Horarios',
    action: () => router.navigate('/schedules')
  },
  {
    label: '🔰 Administración',
    items: [
      {
        label: '👥 Gestión de usuarios',
        action: () => console.log('Opción 1 clickeado')
      },
    ]
  },
  {
    label: '👋 Cerrar sesión',
    action: () => console.log('Cerrar sesión clickeado')
  }
];

export default function HeaderBar() {
  return (
    <div className="bg-gray-100 dark:bg-[#1f2128] shadow-lg rounded-b-4xl  p-4 px-20">
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
            <p className="text-gray-500 dark:text-gray-400   text-2xl">
              /
            </p>
            {/* Dropdown */}
            <DropdownMenu
              openOnHover
              items={menuItems}
            >
              <button className="rounded-full cursor-pointer flex flex-row gap-2 items-center">
                <p className="text-gray-800 dark:text-white text-2xl">
                  Menú
                </p>
                <IoChevronDown className="text-gray-800 dark:text-white text-2xl pt-1" />
              </button>
            </DropdownMenu>
          </section>
        </a>
        <section className="flex flex-row items-center gap-3">
          <AuthController />
          <ThemeToggle />
        </section>
      </section>
    </div>
  )
}