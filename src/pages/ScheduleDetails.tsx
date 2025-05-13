import HeaderBar from "../context/global/HeaderBar";
import HorarioProduction from "../src/HorarioProduction";

export default function ScheduleDetails(){
  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col'>
      <HeaderBar />
      <HorarioProduction />
      <section>
        habra algo mas proximamente =()
      </section>
    </div>
  )
}