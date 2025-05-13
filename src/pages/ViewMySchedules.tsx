import { GoProjectSymlink } from "react-icons/go";
import { API } from "../api/api";
import HeaderBar from "../context/global/HeaderBar";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { toast } from "react-toastify";
import { getRedirectSharedURL } from "../libs/utils";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2'

interface Schedule {
  id: number;
  nombre: string;
  descripcion: string;
  CompartirHorario?: string;
}

export default function ViewMySchedules(){
  const [schedules, setSchedules] = useState([] as Schedule[]);
  const [showModalCreateSchedule, setShowModalCreateSchedule] = useState(-1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModalShareSchedule, setShowModalShareSchedule] = useState(0);
  const [url, setUrl] = useState("");

  async function handleDelete(idSchedule: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await API.delete(`/HorariosUsuarios/${idSchedule}`);
        console.log(response)
        if (response.status === 200) {
          toast.success("Horario eliminado con éxito.");
          getSchedules();
        } else {
          toast.error("Error al eliminar el horario.");
        }
      }
    })
  }

  async function handleSubmit() {
    if (!name || !description) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }


    if(showModalCreateSchedule > 0){
      // modificar
      const response = await API.put(`/HorariosUsuarios/${showModalCreateSchedule}`, {
        nombre: name,
        descripcion: description,
      });

      if (response.status === 200) {
        toast.success("Horario modificado con éxito.");
        setShowModalCreateSchedule(-1);
        setName("");
        setDescription("");
        getSchedules();
      } else {
        toast.error("Error al modificar el horario.");
      }
    } else {
      // crear
      const response = await API.post('/HorariosUsuarios', {
        nombre: name,
        descripcion: description,
      });
      
      if (response.status === 201) {
        toast.success("Horario creado con éxito.");
        setShowModalCreateSchedule(-1);
        setName("");
        setDescription("");
        getSchedules();
      } else {
        toast.error("Error al crear el horario.");
      }

    }

  }
  
  async function handleShare(){
    if (!url) {
      toast.error("Por favor, ingrese el enlace de acceso.");
      return;
    }

    await API.post(`/HorariosUsuarios/share`, {
      url: url,
      horario_id: showModalShareSchedule,
    })
    .then((response) => {
      if (response.status === 201) {
        toast.success("Horario compartido con éxito.");
        setShowModalShareSchedule(0);
        setUrl("");
        getSchedules();
      } else {
        toast.error("Error al compartir el horario.");
      }
    })
    .catch((error) => {
      console.log(error)
      toast.error(error?.response?.data?.message || "Error al compartir el horario.");
    })

  }

  async function getSchedules(){
    const response = (await API.get('/HorariosUsuarios/paginated/1/10'));
    if (response.status === 200) {
      setSchedules(response.data.data);
    } else {
      toast.error("Error al obtener los horarios.");
    }
  }

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col md:h-screen'>
      <HeaderBar />
      {/*  */}
      <section className='px-10 md:px-20 mt-10 md:gap-10 gap-5 grow h-full w-full max-w-screen-xl mx-auto'>
        <div className="flex flex-row justify-between items-center">
          <p className='text-2xl text-gray-800 dark:text-white font-semibold'>
            Tus horarios
          </p>
          <button 
            onClick={() => setShowModalCreateSchedule(0)}
            className='flex flex-row items-center gap-2.5 bg-white dark:bg-[#0b0c10] border border-gray-300 dark:border-[#3c434d] text-gray-800 dark:text-white rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-[#1f2833] transition cursor-pointer px-4 py-2'>
            <p className='text-gray-500 dark:text-gray-400 text-base'>
              Crear nuevo horario
            </p>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {
            schedules.map((schedule, index) => (
              <article key={index} className="flex flex-row gap-5 justify-between bg-white dark:bg-[#0b0c10] border border-gray-300 dark:border-[#3c434d] rounded-lg shadow-sm p-4">
                <div className="w-full">
                  <p className="text-gray-800 dark:text-white text-lg font-semibold">
                    {schedule.nombre}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {schedule.descripcion}
                  </p>
                  <p className="text-gray-800 dark:text-white text-lg font-semibold mt-1">
                    Acceso Publico
                  </p>
                  {/* botón para compartir horario */}
                  {
                    schedule.CompartirHorario ? (
                      <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex flex-row gap-2 items-center">
                        <CiEdit className="text-xl" 
                          onClick={() => setShowModalShareSchedule(schedule.id)}
                        />
                        <a href={getRedirectSharedURL(schedule.CompartirHorario)} >
                          {getRedirectSharedURL(schedule.CompartirHorario)}
                        </a>
                      </p> 
                    ) : (
                      <button onClick={() => setShowModalShareSchedule(schedule.id)} className="flex flex-row gap-2 items-center">
                        <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Compartir
                        </p>
                      </button>
                    )
                  }
                </div>
                <div className="flex flex-col gap-2.5 items-center">
                  <a href={`schedules/${schedule.id}`} className="cursor-pointer hover:scale-125 transition duration-200 ease-in-out">
                    <GoProjectSymlink className="text-3xl animate-pulse text-gray-800 dark:text-white" />
                  </a>
                  {/* Delete */}
                  <button className="cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                    onClick={() => handleDelete(schedule.id)}
                  >
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {/* modificar información schedule */}
                  <button className="cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                    onClick={() => {
                      setShowModalCreateSchedule(schedule.id);
                      setName(schedule.nombre);
                      setDescription(schedule.descripcion);
                    }}
                  >
                    <CiEdit className="text-blue-600 text-3xl" />
                  </button>
                </div>
              </article>
            ))
          }
        </div>
      </section>

      <Modal isOpen={showModalShareSchedule > 0} onClose={() => setShowModalShareSchedule(0)}>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Compartir horario
            </h3>
            <button
              onClick={() => setShowModalShareSchedule(0)}
              className="text-gray-400 hover:text-red-500 cursor-pointer"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Form to create a new schedule */}
          <label htmlFor="schedule-name" className="block text-base font-medium text-gray-700 dark:text-gray-300 required mt-2">
            Enlace de acceso
          </label>
          <input 
            type="text" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1f2128] dark:border-[#3c434d] dark:text-white" 
            placeholder="horarioUniversidadQuintoSemestre"
            required 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex justify-end mt-6 flex-row gap-2">
            <button 
              onClick={handleShare}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 cursor-pointer">
              Compartir
            </button>
            <button 
              onClick={() => setShowModalShareSchedule(0)}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition duration-200 cursor-pointer">
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showModalCreateSchedule >= 0} onClose={() => setShowModalCreateSchedule(-1)}>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Crear nuevo horario
            </h3>
            <button
              onClick={() => setShowModalCreateSchedule(-1)}
              className="text-gray-400 hover:text-red-500 cursor-pointer"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <hr className="my-4 w-full border-gray-400 dark:border-[#3c434d]" />
          {/* Form to create a new schedule */}
          <label htmlFor="schedule-name" className="block text-base font-medium text-gray-700 dark:text-gray-300 required">
            Nombre del horario
          </label>
          <input 
            type="text" 
            id="schedule-name" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1f2128] dark:border-[#3c434d] dark:text-white" 
            placeholder="Nombre del horario"
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="schedule-description" className="block text-base font-medium text-gray-700 dark:text-gray-300 required mt-4">
            Descripción
          </label>
          <textarea 
            id="schedule-description" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1f2128] dark:border-[#3c434d] dark:text-white" 
            placeholder="Descripción del horario"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end mt-6 flex-row gap-2">
            <button 
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 cursor-pointer">
              Crear horario
            </button>
            <button 
              onClick={() => setShowModalCreateSchedule(-1)}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition duration-200 cursor-pointer">
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}