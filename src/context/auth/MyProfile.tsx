import { useAuth } from "../../stores/useAuth"
import DropdownMenu from "../global/DropdownMenu"

export default function MyProfile(){
  const auth = useAuth()

  auth.checkLoginStatus()

  const menuItems = [
    {
      label: '📅 Mis Horarios',
    },
    {
      label: '👋 Cerrar sesión',
      action: () => auth.clearAuth()
    },
    {
      label: "Copy access Token",
      action: () => {
        navigator.clipboard.writeText(auth.access_token)
      }
    }
  ];

  return (
    <>
      <DropdownMenu
        items={menuItems}
        direction="right"
        title={`${auth.profile?.Personas.nombres} ${auth.profile?.Personas.apellidos}`}
      >
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          <img 
            src={`https://ui-avatars.com/api/?name=${auth.profile?.Personas.nombres} ${auth.profile?.Personas.apellidos}`}
            className="rounded-full w-full h-7.5"
          />
        </button>
      </DropdownMenu>

    </>
  )
}