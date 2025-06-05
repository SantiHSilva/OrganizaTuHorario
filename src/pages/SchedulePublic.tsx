import HeaderBar from "../context/global/HeaderBar";
import HorarioView from "../src/HorarioView";

export default function SchedulePublic(){
  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col h-screen overflow-auto'>
      <HeaderBar />
      <div className="mt-5">
        <HorarioView />
      </div>
    </div>
  )
}