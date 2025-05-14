import { useParams } from "react-router";
import DataRoot from "../components/CRUD/DataRoot";
import { DescripcionesGenerales, DescripcionesPorDia, Horario, replaceGroupList } from "../Data/groupManager";
import { useEffect, useState } from "react";
import { API } from "../api/api";
import { globalGroupList } from "../Data/groupManager";

export interface HorarioAPI {
    id:                 number;
    nombre:             string;
    descripcion:        string;
    usuario_id:         number;
    deleted_at:         null;
    ComentariosHorario: ComentariosHorarioAPI[];
    CompartirHorario:   string;
    Materias:           MateriaAPI[];
}

export interface ComentariosHorarioAPI {
    id:         number;
    comentario: string;
    fecha:      Date;
    usuario_id: number;
    horario_id: number;
    deleted_at: null;
}

export interface MateriaAPI {
    id:               number;
    nombre:           string;
    color:            string;
    id_horario:       number;
    deleted_at:       null;
    HorariosMaterias: HorariosMateriaAPI[];
    DetallesMaterias: DetallesMateriaAPI[];
}

export interface DetallesMateriaAPI {
    id:                  number;
    id_materia?:         number;
    descripcion:         string;
    mostrar:             boolean;
    deleted_at:          null;
    id_horario_materia?: number;
}

export interface HorariosMateriaAPI {
    id:                       number;
    id_materia:               number;
    dia:                      string;
    hora_inicio:              string;
    hora_fin:                 string;
    deleted_at:               null;
    DetallesHorariosMaterias: DetallesMateriaAPI[];
}

function HorarioProduction() {
  const { id } = useParams()
  const [update, setUpdate] = useState(false);

  async function getSchedulesFromID(id: string) {
    // attempt to fetch data from localStorage
    const data : HorarioAPI = (await API.get(`HorariosUsuarios/get/${id}`)).data
    console.log("Data from API: ", data);
    const dataFormatted : Horario[] = data.Materias.map((materia: MateriaAPI) => {
      const descripcionesGenerales: DescripcionesGenerales[] = materia.DetallesMaterias.map((descripcion: DetallesMateriaAPI) => {
        return {
          mostrar_en_tabla: descripcion.mostrar,
          titulo: descripcion.descripcion
        }
      })
      return {
        name: materia.nombre,
        key: materia.id,
        color: materia.color,
        materias: materia.HorariosMaterias.map((horario: HorariosMateriaAPI) => {
          const descripcionesPorDia: DescripcionesPorDia[] = horario.DetallesHorariosMaterias.map((descripcion: DetallesMateriaAPI) => {
            return {
              dia: horario.dia,
              inicio: horario.hora_inicio,
              fin: horario.hora_fin,
              ajustes: [
                {
                  mostrar_en_tabla: descripcion.mostrar,
                  titulo: descripcion.descripcion
                }
              ]
            }
          })
          return {
            descripciones_generales: descripcionesGenerales,
            descripciones_por_dia: descripcionesPorDia
          }
        })
      }
    })

    replaceGroupList(dataFormatted);
    setUpdate(!update);
  }

  useEffect(() => {
    if (!id) return;
    getSchedulesFromID(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <DataRoot
      data={globalGroupList}
    />
  )
}

export default HorarioProduction
