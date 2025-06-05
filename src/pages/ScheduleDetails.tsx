import { useParams } from "react-router";
import { API } from "../api/api";
import HeaderBar from "../context/global/HeaderBar";
import { getGroupList } from "../Data/groupManager";
import HorarioProduction from "../src/HorarioProduction";
import { toast } from "react-toastify";

export default function ScheduleDetails(){

  const {id} = useParams();

  async function saveShcedules(){

    if(!id){
      toast.error("No se ha encontrado el ID del horario");
    }

    const groupList = getGroupList();
    console.log("Group List: ", groupList);

    const response = await API.post(`/HorariosUsuarios/save/${id}`, groupList)
    .then((response) => {
      console.log("Response: ", response);
      return response;
    })
    .catch((error) => {
      toast.error("Error guardando los cambios");
      console.log("Error: ", error);
    })

    if(response?.status === 201){
      toast.success("Cambios guardados correctamente");
    }

  }

  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col h-screen overflow-auto'>
      <HeaderBar />
      <section className='px-4 md:px-5 m-5 gap-4 md:gap-0 w-full max-w-screen-xl mx-auto items-center dark:bg-[#1f2128] rounded-xl p-4 flex flex-row justify-between'>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          Área Administrativa
        </p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          onClick={saveShcedules}
        >
          Guardar Cambios
        </button>
      </section>
      <HorarioProduction />
    </div>
  )
}