import { useState } from "react";
import HeaderBar from "../context/global/HeaderBar";
import { toast } from "react-toastify";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'

const URL_MICROSERVICIO = 'http://127.0.0.1:8001';

export interface ResponseAUDIO {
    status:              boolean;
    message:             string;
    texto_combinado:     string;
    tesauros:            { [key: string]: { [key: string]: number } };
    polaridad_resumido:  PolaridadResumido;
    polaridad_detallado: { [key: string]: number };
}

export interface PolaridadResumido {
    positivo: number;
    negativo: number;
    neutral:  number;
}

const API = axios.create({
  baseURL: URL_MICROSERVICIO,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export default function ScrappingWAV(){
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseAUDIO | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {

      const file: File = e.target.files[0];

      if (file.type !== "audio/wav") {
        toast.error("Por favor, sube un archivo WAV válido.");
        setFile(null);
        return;
      }

      setFile(file);
      setData(null); // Reset data when a new file is selected
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Por favor, selecciona un archivo antes de subir.");
      return;
    }

    if (file.size === 0) {
      toast.error("El archivo no tiene contenido.");
      return;
    }

    // Aquí puedes agregar la lógica para subir el archivo
    // Por ejemplo, enviarlo a un servidor o procesarlo de alguna manera
    setLoading(true);

    const data = new FormData();
    data.append('file', file);
    try {
      const response: ResponseAUDIO = (await API.post('/uploadfile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })).data;

      console.log("Respuesta del servidor:", response);
      setData(response);

      if (!response.status) {
        toast.error(response.message);
        setLoading(false);
        return;
      }
    }
    catch (error) {
      console.error("Error al subir el archivo:", error);
      toast.error("Error al subir el archivo. Por favor, inténtalo de nuevo.");
      setLoading(false);
      return;
    }

    toast.success("Archivo subido y procesado correctamente.");
    setLoading(false);
  };

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
            Sube un audio en formato WAV para obtener la transcripción, relevancia con los sistemas horarios y mostrar una gráfica de actitud en la grabación.
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="file"
              placeholder="ID del video"
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full placeholder:text-gray-600 dark:text-white outline-none"
              onChange={handleFileChange}
              accept=".wav"
              required
            />
            <button
              className="bg-blue-500 text-white rounded-lg p-2 cursor-pointer hover:bg-blue-600 transition duration-100 hover:scale-105 disable:grayscale-100"
              onClick={handleUpload}
              disabled={!file || file.type !== "audio/wav" || file.size === 0}
            >
              Scrappear
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-5">

        {
          loading && (
            <section className="h-8/12 grow mt-5 items-center justify-center flex flex-col">
              <TypeAnimation
                className="text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-10"
                sequence={[
                  'Subiendo el archivo al servicio...',
                  500,
                  'Segmentando el audio para traducirse...',
                  500,
                  'Transcribiendo el audio...',
                  500,
                  'Transcribiendo el audio..',
                  400,
                  'Transcribiendo el audio.',
                  300,
                  'Transcribiendo el audio..',
                  200,
                  'Transcribiendo el audio...',
                  100,
                  '^_____^',
                  3000,
                  '(‾◡◝)',
                  3000,
                  '(∪.∪ )...zzz',
                  3000,
                  '(_　_)。゜zｚＺ',
                  3000,
                  '(￣o￣) . z Z',
                  3000,
                  '(～﹃～)~zZ',
                  3000,
                  '(✿◠‿◠)',
                  3000,
                  '✍(◔◡◔)',
                  3000,
                  '༼ つ ◕_◕ ༽つ',
                  3000,
                  'w(ﾟДﾟ)w',
                  3000,
                  '＼（〇_ｏ）／',
                  3000,
                  '...( ＿ ＿)ノ｜',
                  3000,
                  '（＞人＜；）',
                  3000,
                  'o((⊙﹏⊙))o.',
                  3000,
                  '(⊙_⊙;)',
                  3000,
                  '(⊙_⊙)？',
                  3000,
                  '(⊙_(⊙_⊙)_⊙)',
                  3000,
                  '¯\\(°_o)/¯',
                  3000,
                  'o(><；)oo',
                  3000,
                  '(°ー°〃)',
                  3000,
                  '(。>︿<)_θ',
                  3000,
                  '╮（╯＿╰）╭',
                  3000,
                  '━┳━　━┳━',
                  100000,
                ]}
                repeat={Infinity}
              />
              <div className="loader2 scale-150"></div> 
            </section>
          )
        }
        {data && (
          <>
            {/* Mostrar comentarios */}
            <section className="dark:bg-[#1f2128] h-full  my-5">
              <h1 className="text-2xl text-gray-800 font-semibold text-center dark:text-white p-4">
                Transcripción del audio
              </h1>
              <div className="h-full max-h-[90vh] overflow-auto">
                {
                  data.texto_combinado
                }
              </div>
            </section>
              {/* Gráfica comentarios populares */}
              <h1 className="text-4xl text-gray-800 dark:text-white text-center">
                Top 10 Palabras Más Menciondas en el Audio
              </h1>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Top 10 Palabras Más Menciondas en el Audio',
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
                            text: 'Veces mencionados'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: 'Esta palabra se repitio en <b>{point.y} la conversación</b>'
                    },
                    series: [{
                        name: 'Population',
                        colorByPoint: true,
                        groupPadding: 0,
                        data: 
                        // Convertir el objeto a un array de entradas [palabra, frecuencia]
                        Object.entries(
                          data.texto_combinado.split(/\s+/)
                            .reduce((acc: { [key: string]: number }, word: string) => {
                                word = word.toLowerCase();

                                // Ignorar palabras vacías o muy cortas
                                if (word.length < 8) return acc;

                                if (word in acc) {
                                    acc[word]++;
                                } else {
                                    acc[word] = 1;
                                }
                                return acc;
                            }, {})
                        )
                        .map(([word, count]) => ({
                            name: word,
                            y: count as number
                        }))
                        .sort((a, b) => b.y - a.y) // Ordenar por frecuencia
                        .slice(0, 10), // Tomar solo los 10 más frecuentes

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
                      Object.keys(data.polaridad_detallado).map((key, index) => (
                        <div key={index} className="text-gray-600 dark:text-gray-400 p-4 border-b border-gray-300 dark:border-gray-600">
                          <p className="font-semibold">{key}:</p>  {data.polaridad_detallado[key]}
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
              <div className="md:grid md:grid-cols-2 gap-5 flex flex-col">

              {
                Object.keys(data.tesauros).map((key, index) => (
                  <section className="">
                    <h1 className="text-4xl text-gray-800 dark:text-white text-center">
                      {key}
                    </h1>
                    {
                      Object.keys(data.tesauros[key]).length ? (
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
                                      Object.keys(data.tesauros[key]).map((subKey) => ({
                                          name: subKey,
                                          y:
                                            data.tesauros[key][subKey],
                                          color:
                                            '#' +
                                            Math.floor(Math.random() * 16777215).toString(16),
                                      }))
                                      // ordenar ascendente
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
              </div>

          </>
        )}
        </section>

      </main>
    </div>
  )
}