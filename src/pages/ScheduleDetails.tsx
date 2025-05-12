import { useEffect, useState } from "react";
import HeaderBar from "../context/global/HeaderBar";
import { useParams } from "react-router";
import { API } from "../api/api";
import {BiSolidBookOpen} from "react-icons/bi";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function ScheduleDetails(){
  // const [schedule, setSchedule] = useState([]);
  // const {id} = useParams();

  // async function getSchedule(){
  //   const data = await API.get(`/HorariosUsuarios/get/${id}`);
  //   console.log('data', JSON.stringify(data.data));
  //   setSchedule(data);
  // }

  // useEffect(() => {
  //   getSchedule();
  // }, [])


  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col md:h-screen'>
      <HeaderBar />
      <div className='px-4 md:px-0 m-5 grow gap-4 md:gap-0 h-full w-full max-w-screen-xl mx-auto grid md:grid-cols-12 items-center'>
        {/* Schedule View */}
        <section className="md:col-span-7 h-[60vh] bg-white dark:bg-[#262c2c] rounded-lg md:rounded-l-lg md:rounded-r-none shadow-md md:h-full">
          <div className="px-6 flex flex-row justify-between rounded-lg md:rounded-r-none items-center py-2">
            <p className="text-white font-medium text-xl">
              Horario
            </p>
            <div className="flex flex-row items-center">
              <button className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-l-lg text-white disabled:text-gray-500">
                &lt;
              </button>
              <select className="bg-[#212529] text-white text-lg font-medium px-4 py-2">
                <option value="1">1</option>
              </select>
              <button className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-r-lg text-white disabled:text-gray-500" disabled>
                &gt;
              </button>
            </div>
            <div>
              algo
            </div>
          </div>
          Horario aquí XD
        </section>
        <section className="md:col-span-5 h-[60vh] bg-white dark:bg-[#2c3333] rounded-lg md:rounded-r-lg md:rounded-l-none shadow-md md:h-full">
          <div className="bg-[#27374d] p-3 py-4 md:rounded-t-none md:mx-5 md:rounded-b-lg rounded-lg shadow-md">
            <p className="text-white text-xl flex flex-row items-start gap-2">
              <BiSolidBookOpen className="text-3xl" />
              Asignaturas
            </p>
          </div>
          manejo de materias
        </section>
      </div>
    </div>
  )
}