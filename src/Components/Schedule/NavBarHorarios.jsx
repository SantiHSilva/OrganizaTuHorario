import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Pagination, Form, Dropdown} from "react-bootstrap";
import {Ri24HoursLine} from "react-icons/ri";
import {HiEllipsisVertical} from "react-icons/hi2";
import {SiMicrosoftexcel} from "react-icons/si";
import {BsFiletypePng} from "react-icons/bs";
import {VscFilePdf} from "react-icons/vsc";
import {exportPDF, exportCombinationsPDF} from "../../Utils/Export/PDF.js";
import ExportPNG from "../../Utils/Export/PNG.js";
import {ExportExcel, exportCombinationsExcel} from "../../Utils/Export/XLSX.js";
import html2canvas from "html2canvas";
import {useState} from "react";

export const NavBarHorarios = ({combinaciones, pagina, setPagina, mostrarPorHorario24Horas, setMostrarPorHorario24Horas, theme}) => {

  const [bloquear, setBloquear] = useState(false);

  function prevPageHorario(){
    if(pagina === 0) return;
    setPagina(pagina - 1);
  }

  function nextPageHorario(){
    if(pagina === combinaciones.length) return;
    setPagina(pagina + 1);
  }

  return (
    <>
      <Navbar className="shadow-sm rounded">
        <Container fluid>

            <div
              className='fs-5'
              style={{
                color: theme === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              Horarios
            </div>

            <Pagination
              className='m-0'
            >
              <Pagination.Prev
                onClick={prevPageHorario}
                disabled={pagina === 0 || bloquear}
              />
              <Form.Select
                disabled={bloquear}
                style={{
                  border: 'none',
                  borderRadius: '0px',

                }}
                onChange={(e) => setPagina(parseInt(e.target.value))}
                value={pagina}
              >
                {
                  combinaciones.length === 0 ?
                    <option value={0}> 0 </option>
                    :
                  combinaciones.map((combinacion, index) => (
                    <option key={index} value={index}
                    >
                      {index + 1}
                    </option>
                  ))
                }
              </Form.Select>
              <Pagination.Next
                onClick={nextPageHorario}
                disabled={pagina === (combinaciones.length - 1) || combinaciones.length === 0 || bloquear}
              />

            </Pagination>


          <div className='d-flex'>


            <div

              style={{
                visibility: 'hidden',
              }}
            >
              1234
            </div>

            <Dropdown>
              <Dropdown.Toggle className={'p-0'}
                               style={{
                                 backgroundColor: 'transparent',
                                 border: 'none',
                               }}
              >

                <HiEllipsisVertical
                  size={20}
                  style={{
                    fill: theme === 'dark' ? '#ffffff' : '#000000',
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setMostrarPorHorario24Horas(!mostrarPorHorario24Horas)}
                >
                  <Ri24HoursLine
                    size={20}
                    className='me-2'
                  />
                  Cambiar formato de las horas a
                  <span className='fw-bold'>
                  {mostrarPorHorario24Horas ?
                    " 12 horas"
                    :
                    " 24 horas"}
                  </span>
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.ItemText
                  className='fw-bold text-center'
                  style={{
                    userSelect: 'none',
                  }}
                >
                  Exportar individualmente
                </Dropdown.ItemText>

                {/* Exportar por PNG individual */}

                <Dropdown.Item
                  onClick={() => {
                    ExportPNG("exportScheduleClassTable", html2canvas)
                  }}
                >
                  <BsFiletypePng
                    size={20}
                    className='me-2'/>
                  PNG
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => ExportExcel("exportScheduleClassTable")}
                >
                  <SiMicrosoftexcel
                    size={20}
                    className='me-2'
                  />
                  Excel
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    exportPDF("exportScheduleClassTable", html2canvas)
                  }}
                >
                  <VscFilePdf
                    size={20}
                    className='me-2'
                  />
                  PDF
                </Dropdown.Item>

                {/* Exportación grupal */}

                <Dropdown.Divider />

                <Dropdown.ItemText
                  className='fw-bold text-center'
                  style={{
                    userSelect: 'none',
                  }}
                >
                  Exportar grupalemente
                </Dropdown.ItemText>

                <Dropdown.Item
                  onClick={() => {
                    setBloquear(true)
                    exportCombinationsPDF(combinaciones, html2canvas, setPagina).then(() => {
                      setBloquear(false)
                    })
                  }}
                >
                  <VscFilePdf
                    size={20}
                    className='me-2'
                  />
                  PDF
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    setBloquear(true)
                    exportCombinationsExcel(combinaciones, setPagina).then(() => {
                      setBloquear(false)
                    })
                  }}
                >
                  <SiMicrosoftexcel
                    size={20}
                    className='me-2'
                  />
                  Excel
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>

          </div>

        </Container>
      </Navbar>
    </>
  )
}