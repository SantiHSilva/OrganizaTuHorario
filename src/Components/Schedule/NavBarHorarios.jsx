import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Pagination, Form, Dropdown, ButtonGroup} from "react-bootstrap";
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
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";

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

  function getActualFormat(){
    return !mostrarPorHorario24Horas ? "24" : "12";
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
              <FormattedMessage id={"scheduleTitle"} />
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
                  <FormattedMessage id={"scheduleChangeTimeFormat"} values={{format: `${getActualFormat()}`}}/>
                </Dropdown.Item>
                <Dropdown.Divider />

                {/* Exportar horarios individualmente */}

                <Dropdown.ItemText
                  className='fw-bold text-center'
                  style={{
                    userSelect: 'none',
                  }}
                >
                  <FormattedMessage id={"scheduleExportIndividual"} /> ({pagina + 1})
                </Dropdown.ItemText>

                <ButtonGroup
                  className='d-flex m-2'
                >

                  {/* PNG*/}

                  <Button
                    variant='warning'
                    onClick={() => {
                      ExportPNG("exportScheduleClassTable" + pagina, html2canvas)
                    }}
                  >
                    <BsFiletypePng
                      size={20}
                      className='me-2'/>
                    PNG
                  </Button>

                  {/* Excel */}

                  <Button
                    variant='success'
                    onClick={() => ExportExcel("exportScheduleClassTable" + pagina)}
                  >
                    <SiMicrosoftexcel
                      size={20}
                      className='me-2'
                    />
                    Excel
                  </Button>

                  {/* PDF*/}

                  <Button
                    variant='danger'
                    onClick={() => {
                      exportPDF("exportScheduleClassTable" + pagina, html2canvas)
                    }}
                  >
                    <VscFilePdf
                      size={20}
                      className='me-2'
                    />
                    PDF
                  </Button>
                </ButtonGroup>

                {/* Exportación grupal */}

                <Dropdown.Divider />

                <Dropdown.ItemText
                  className='fw-bold text-center'
                  style={{
                    userSelect: 'none',
                  }}
                >
                  <FormattedMessage id={"scheduleExportAll"}/>
                </Dropdown.ItemText>

                  <ButtonGroup
                    className='d-flex m-2'
                  >

                    {/*PDF Grupal*/}

                    <Button
                      onClick={() => {
                        setBloquear(true)
                        exportCombinationsPDF(combinaciones, html2canvas, setPagina).then(() => {
                          setBloquear(false)
                        })
                      }}
                      variant='danger'
                    >
                      <VscFilePdf
                        size={20}
                        className='me-2'
                      /> PDF
                    </Button>

                    {/* Excel grupal */}

                    <Button
                      variant='success'
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
                    </Button>
                  </ButtonGroup>

              </Dropdown.Menu>
            </Dropdown>

          </div>

        </Container>
      </Navbar>
    </>
  )
}