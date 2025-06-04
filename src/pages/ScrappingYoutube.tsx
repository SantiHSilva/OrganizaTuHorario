import { useState } from "react";
import HeaderBar from "../context/global/HeaderBar";
import { isURL, parseStringTOHTML } from "../libs/utils";
import { toast } from "react-toastify";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export interface Welcome {
    status:              boolean;
    msg:                 string;
    comentarios:         string[];
    usuarios:            string[];
    comentarios_limpios: string[];
    palabras_repetidas:  PalabrasRepetida[];
    polaridad_detallada: { [key: string]: { [key: string]: string }; }[];
    polaridad_resumido:  PolaridadResumido;
    conteos_tesauros:    { [key: string]: { [key: string]: number; }; };
    conceptos_open_alex: ConceptosOpenAlex[];
    iframe_relacionados: string;
    iframe_no_relacionados: string;
}

export interface ConceptosOpenAlex {
    id:           number;
    display_name: string;
    level:        number;
    score:        number;
}

export interface TomaDeDecisiones {
    valor:     number;
    problemas: number;
    sistemas:  number;
}

export interface UsuarioDeInformación {
    estudio:   number;
    sociedad:  number;
    necesidad: number;
}

export interface PalabrasRepetida {
    "":   string;
    freq: string;
}

export interface PolaridadResumido {
    positivo: number;
    negativo: number;
    neutral:  number;
}

const URL_MICROSERVICIO = 'http://127.0.0.1:8000';

const API = axios.create({
  baseURL: URL_MICROSERVICIO,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export default function ScrappingYoutube(){
  const [idVideo, setIdVideo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Welcome | null>(null);

  async function handleChangeIDVideo(){
    if(!idVideo)
      return

    if(isURL(idVideo)){
      toast.error('No se puede usar una URL, por favor ingrese el ID del video.');
    }

    setData(null)

    setLoading(true);

    const data = (await API.get(`/archivos/${idVideo}`)).data

    if(!data.status){
      await API.get(`/analizar/${idVideo}`)
      handleChangeIDVideo()
      return
    }

    console.log(data);

    setData(data);

    setLoading(false)
  }

  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col'
      style={{
        minHeight: '100vh',
      }}
    >
      <HeaderBar />
      {/* ! Video */}
      <main className="px-10 md:px-20 mt-10 md:gap-10 gap-5 grow h-full w-full max-w-screen-xl mx-auto">
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl text-gray-800 dark:text-white">
            Ingresa el ID del video para analizar
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="ID del video"
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full placeholder:text-gray-600 dark:text-white outline-none"
              value={idVideo}
              onChange={(e) => setIdVideo(e.target.value)}
              />
            <button
              className="bg-blue-500 text-white rounded-lg p-2 cursor-pointer hover:bg-blue-600 transition duration-100 hover:scale-105"
              onClick={() => handleChangeIDVideo()}
              >
              Scrappear
            </button>
          </div>
        </section>
        {
          loading && (
            <section className="h-8/12 grow mt-5 items-center justify-center flex flex-col">
              <TypeAnimation
                className="text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-10"
                sequence={[
                  'Recolectando Comentarios...',
                  1000,
                  'Obteniendo Usuarios...',
                  1000,
                  'Limpiando el Texto...',
                  1000,
                  'Analizando el Texto...',
                  1000,
                  'Buscando Patrones...',
                  1000,
                  'Consultando a OpenAlex...',
                  1000,
                ]}
                repeat={Infinity}
              />
              <div className="loader scale-150"></div> 
            </section>
          )
        }
        {
          data && (
            <div className="my-10 flex flex-col gap-10">
              {/* comentarios */}
              <section className="flex flex-col md:grid md:grid-cols-2 h-[90vh] gap-5 ">
                <div className="dark:bg-[#1f2128] h-full max-h-full overflow-auto">
                  <h1 className="text-2xl text-gray-800 dark:text-white p-4">
                    Comentarios: {data.comentarios.length}
                  </h1>
                  <div className="h-full">
                    {
                      data.comentarios.map((comentario, index) => (
                        <p key={index} className="text-gray-600 dark:text-gray-400 p-4 border-b border-gray-300 dark:border-gray-600">
                          {comentario}
                        </p>
                      ))
                    }
                  </div>
                </div>
                <div className="dark:bg-[#1f2128] h-full max-h-full overflow-auto">
                  <h1 className="text-2xl text-gray-800 dark:text-white p-4">
                    Usuarios: {data.usuarios.length}
                  </h1>
                  <div className="h-full">
                    {
                      data.usuarios.filter((usuario) => usuario !== '').map((usuario, index) => (
                        <p key={index} className="text-gray-600 dark:text-gray-400 p-4 border-b border-gray-300 dark:border-gray-600">
                          {usuario}
                        </p>
                      ))
                    }
                  </div>
                </div>
              </section>
              <section className="dark:bg-[#1f2128] h-full max-h-[90vh] overflow-auto">
                <h1 className="text-2xl text-gray-800 dark:text-white p-4">
                  Comentarios Limpiados {data.comentarios_limpios.length}
                </h1>
                <div className="h-full">
                  {
                    data.comentarios_limpios.filter((usuario) => usuario !== '').map((usuario, index) => (
                      <p key={index} className="text-gray-600 dark:text-gray-400 p-4 border-b border-gray-300 dark:border-gray-600">
                        {usuario}
                      </p>
                    ))
                  }
                </div>
              </section>
              {/* Gráfica comentarios populares */}
              <h1 className="text-4xl text-gray-800 dark:text-white text-center">
                Top 10 Comentarios Más Repetidos
              </h1>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Top 10 Palabras Más Repetidas en Comentarios'
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            autoRotation: [-45, -90],
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Número de comentarios'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: 'Esta palabra se repitio en <b>{point.y} comentarios</b>'
                    },
                    series: [{
                        name: 'Population',
                        colorByPoint: true,
                        groupPadding: 0,
                        data: data.palabras_repetidas
                        // ordenar mayor a menor
                        .sort((a, b) => parseInt(b.freq) - parseInt(a.freq))
                        .splice(0, 10).map((palabra) => {
                          return {
                            name: palabra[''],
                            y: parseInt(palabra.freq),
                            drilldown: null
                          }
                        }),
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            inside: true,
                            verticalAlign: 'top',
                            format: '{point.y}', // one decimal
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                }}
              />
              <h1 className="text-4xl text-gray-800 dark:text-white text-center">
                Análisis de Sentimientos de Comentarios
              </h1>
              <div className="md:grid md:grid-cols-2 gap-5 flex flex-col">
                <section className="dark:bg-[#1f2128] h-full max-h-[90vh] overflow-auto">
                  <h1 className="text-2xl text-gray-800 dark:text-white p-4">
                    Por comentario
                  </h1>
                  <div className="h-full">
                    {
                      Object.keys(data.polaridad_detallada).map((key, index) => (
                        <div key={index} className="text-gray-600 dark:text-gray-400 p-4 border-b border-gray-300 dark:border-gray-600">
                          <p className="font-semibold">{key}:</p>  {data.polaridad_detallada[key]}
                        </div>
                      ))
                    }
                  </div>

                </section>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                      chart: {
                          type: 'pie',
                          zooming: {
                              type: 'xy'
                          },
                          panning: {
                              enabled: true,
                              type: 'xy'
                          },
                          panKey: 'shift'
                      },
                      title: {
                          text: 'Análisis de Sentimientos Totalización'
                      },
                      tooltip: {
                          valueSuffix: '%'
                      },
                      plotOptions: {
                          pie: {
                              allowPointSelect: true,
                              cursor: 'pointer',
                              dataLabels: [{
                                  enabled: true,
                                  distance: 20
                              }, {
                                  enabled: true,
                                  distance: -40,
                                  format: '{point.percentage:.1f}%',
                                  style: {
                                      fontSize: '1.2em',
                                      textOutline: 'none',
                                      opacity: 0.7
                                  },
                                  filter: {
                                      operator: '>',
                                      property: 'percentage',
                                      value: 10
                                  }
                              }]
                          }
                      },
                      series: [
                          {
                              name: 'Percentage',
                              colorByPoint: true,
                              data: [
                                  {
                                      name: 'Positivo',
                                      y: data.polaridad_resumido.positivo,
                                      color: '#00FF00',
                                  },
                                  {
                                      name: 'Negativo',
                                      y: data.polaridad_resumido.negativo,
                                      color: '#FF0000',
                                  },
                                  {
                                      name: 'Neutral',
                                      y: data.polaridad_resumido.neutral,
                                      color: '#FFFF00',
                                  },
                              ]
                          }
                      ]
                    }}
                  />
              </div>
              <h1 className="text-4xl text-gray-800 dark:text-white text-center">
                Análisis de Tesauros
              </h1>
              <section className="md:grid md:grid-cols-2 gap-5 flex flex-col">

              {
                Object.keys(data.conteos_tesauros).map((key, index) => (
                  <section>
                    <h1 className="text-4xl text-gray-800 dark:text-white text-center">
                      {key}
                    </h1>
                    {
                      Object.keys(data.conteos_tesauros[key]).length ? (
                        <HighchartsReact
                          key={index}
                          highcharts={Highcharts}
                          options={{
                            chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Top 10 Palabras Más Repetidas en Comentarios'
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            autoRotation: [-45, -90],
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Número de comentarios'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: 'Esta palabra se repitio en <b>{point.y} comentarios</b>'
                    },
                            series: [
                                {
                                    name: 'Percentage',
                                    colorByPoint: true,
                                    data:
                                      Object.keys(data.conteos_tesauros[key]).map((subKey) => ({
                                          name: subKey,
                                          y:
                                            data.conteos_tesauros[key][subKey],
                                          color:
                                            '#' +
                                            Math.floor(Math.random() * 16777215).toString(16),
                                      }))// ordenar ascendente
                                      .sort((a, b) => b.y - a.y)
                                },
                            ],
                          }}
                        />
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 p-4 border-b border-gray-300 dark:border-gray-600">
                          No se encontraron resultados para este tesauro.
                        </p>
                      )
                    } 
                  </section>
                ))
              }
              </section>

              {/* No relacionados */}
              <div dangerouslySetInnerHTML={{
                __html: data.iframe_no_relacionados
              }} /> 

              {/* No relacionados */}
              <div dangerouslySetInnerHTML={{
                __html: data.iframe_relacionados
              }} /> 

            </div>
          )
        }
      </main>
    </div>
  )
}