import { useEffect, useState } from "react";
import HeaderBar from "../context/global/HeaderBar";
import { useParams } from "react-router";
import { API } from "../api/api";
import {BiSolidBookOpen} from "react-icons/bi";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import HorarioProduction from "../src/HorarioProduction";

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
      <HorarioProduction />
    </div>
  )
}