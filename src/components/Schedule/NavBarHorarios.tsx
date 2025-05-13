import {HiEllipsisVertical} from "react-icons/hi2";
import {exportPDF, exportCombinationsPDF} from "../../Utils/Export/PDF.js";
import ExportPNG from "../../Utils/Export/PNG.js";
import {ExportExcel, exportCombinationsExcel} from "../../Utils/Export/XLSX.js";
import html2canvas from "html2canvas";
import {useState} from "react";
import { Horario } from '../../Data/groupManager.js';
import { utils, writeFile } from 'xlsx';
import DropdownMenu from '../../context/global/DropdownMenu.js';

interface Props {
  combinaciones: Horario[][];
  pagina: number;
  setPagina: (pagina: number) => void;
  mostrarPorHorario24Horas: boolean;
  setMostrarPorHorario24Horas: (mostrarPorHorario24Horas: boolean) => void;
}

export const NavBarHorarios = ({combinaciones, pagina, setPagina, mostrarPorHorario24Horas, setMostrarPorHorario24Horas}: Props) => {

  const [bloquear, setBloquear] = useState(false);

  function prevPageHorario(){
    if(pagina === 0) return;
    setPagina(pagina - 1);
  }

  function nextPageHorario(){
    if(pagina === combinaciones.length) return;
    setPagina(pagina + 1);
  }

  const menuItems = [
    {
      label: `Cambiar formato de horario a ${!mostrarPorHorario24Horas ? "12" : "24"} horas`,
      action: () => setMostrarPorHorario24Horas(!mostrarPorHorario24Horas)
    },
    {
      label: `Exportar horario individual (${pagina + 1})`,
      items: [
        {
          label: 'PNG',
          action: () => ExportPNG("exportScheduleClassTable" + pagina, html2canvas)
        },
        {
          label: 'Excel',
          action: () => ExportExcel("exportScheduleClassTable" + pagina, writeFile, utils.table_to_book)
        },
        {
          label: 'PDF',
          action: () => exportPDF("exportScheduleClassTable" + pagina, html2canvas)
        }
      ]
    },
    {
      label: "Exportar horarios grupal",
      items: [
        {
          label: 'Excel',
          action: () => {
            setBloquear(true)
            exportCombinationsExcel(combinaciones, setPagina).then(() => {
              setBloquear(false)
            })
          }
        },
        {
          label: 'PDF',
          action: () => {
            setBloquear(true)
            exportCombinationsPDF(combinaciones, html2canvas, setPagina).then(() => {
              setBloquear(false)
            })
          }
        }
      ]
    },
  ];

  return (
    <>
      <section className="shadow-sm rounded">
        <div className='flex flex-row px-5 py-2 justify-between items-center'>
            <p className="dark:text-white font-medium text-xl">
              Horarios
            </p>
            <section>
              <button 
                onClick={prevPageHorario}
                disabled={pagina === 0 || bloquear}
                className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-l-lg text-white disabled:text-gray-500">
                &lt;
              </button>
              <select className="bg-[#212529] text-white text-lg font-medium px-4 py-2"
                onChange={(e) => setPagina(parseInt(e.target.value))}
                value={pagina}
              >
                {
                  combinaciones.length === 0 ?
                    <option value={0}> 0 </option>
                    :
                  combinaciones.map((_, index) => (
                    <option key={index} value={index}
                    >
                      {index + 1}
                    </option>
                  ))
                }
              </select>
              <button 
                onClick={nextPageHorario}
                disabled={pagina === (combinaciones.length - 1) || combinaciones.length === 0 || bloquear}
                className="h-full p-[0.48rem] border-1 border-gray-500 disabled:border-gray-600 cursor-pointer disabled:cursor-not-allowed hover:border-gray-500 bg-[#212529] disabled:bg-[#343a40] rounded-r-lg text-white disabled:text-gray-500">
                &gt;
              </button>
            </section>


          <div className='flex flex-row items-center'>
            <div
              style={{
                visibility: 'hidden',
              }}
            >
              1234
            </div>

            {/* Dropdown */}
            <DropdownMenu
              items={menuItems}
            >
              <HiEllipsisVertical
                  size={20}
                  className='text-black dark:text-white'
                />
            </DropdownMenu>
          </div>
        </div>
      </section>
    </>
  )
}