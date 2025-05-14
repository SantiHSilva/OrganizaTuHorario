import HeaderBar from "../context/global/HeaderBar";
import HorarioProduction from "../src/HorarioProduction";

export default function ScheduleDetails(){
  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col'>
      <HeaderBar />
      <section className='px-4 md:px-5 m-5 grow gap-4 md:gap-0 w-full max-w-screen-xl mx-auto items-center dark:bg-[#1f2128] rounded-xl p-4 flex flex-row justify-between'>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          Área Administrativa
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer">
          Guardar Cambios
        </button>
      </section>
      <HorarioProduction />
    </div>
  )
}