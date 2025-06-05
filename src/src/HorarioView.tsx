import { useParams } from "react-router";
import DataRoot from "../components/CRUD/DataRoot";
import { DescripcionesGenerales, DescripcionesPorDia, Horario, replaceGroupList } from "../Data/groupManager";
import { useEffect, useState } from "react";
import { API } from "../api/api";
import { globalGroupList } from "../Data/groupManager";
import { toast } from "react-toastify";

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
    orden:               number;
    id_horario_materia?: number;
}

export interface HorariosMateriaAPI {
    id:                       number;
    id_materia:               number;
    dia:                      string;
    hora_inicio:              string;
    hora_fin:                 string;
    orden:               number;
    deleted_at:               null;
    DetallesHorariosMaterias: DetallesMateriaAPI[];
}

function HorarioView() {
  const { id } = useParams()
  const [update, setUpdate] = useState(false);

  async function getSchedulesFromID(id: string) {
    // attempt to fetch data from localStorage
    try{

      const data : HorarioAPI = (await API.get(`HorariosUsuarios/view/${id}`)).data
      console.log("Data from API: ", data);
      const dataFormatted: Horario[] = [];
  
      data.Materias.forEach((materia: MateriaAPI) => {
        const newMateria: Horario = {
          key: materia.id,
          name: materia.nombre,
          color: materia.color,
          materias: []
        };
  
        // a través de "orden", agruparlos
        const DetallesMateriasAgrupados = materia.DetallesMaterias.reduce((acc: { [key: number]: DetallesMateriaAPI[] }, detalle) => {
          if (!acc[detalle.orden]) {
            acc[detalle.orden] = [];
          }
          acc[detalle.orden].push(detalle);
          return acc;
        }, {});
  
        const HorariosMateriasAgrupados = materia.HorariosMaterias.reduce((acc: { [key: string]: HorariosMateriaAPI[] }, horario) => {
          const key = horario.orden;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(horario);
          return acc;
        }
        , {});
  
        // Iterate through each group of HorariosMaterias
        Object.keys(HorariosMateriasAgrupados).forEach((key) => {
          const horario = HorariosMateriasAgrupados[key]; // Get the first horario of the group
          const detalleGeneral = DetallesMateriasAgrupados[parseInt(key)]; // Get the first detalle of the group
  
          const descripcionesGenerales: DescripcionesGenerales[] = detalleGeneral.map((detalle) => ({
            mostrar_en_tabla: detalle.mostrar,
            titulo: detalle.descripcion
          }));
  
          const descripcionesPorDia: DescripcionesPorDia[] = horario.map((horarioMateria) => ({
            dia: horarioMateria.dia,
            inicio: horarioMateria.hora_inicio,
            fin: horarioMateria.hora_fin,
            ajustes: detalleGeneral.map((detalle) => ({
              mostrar_en_tabla: detalle.mostrar,
              titulo: detalle.descripcion
            }))
          }));
  
          newMateria.materias.push({
            descripciones_generales: descripcionesGenerales,
            descripciones_por_dia: descripcionesPorDia
          });
        })
        
        dataFormatted.push(newMateria);
      });
  
      replaceGroupList(dataFormatted);
      setUpdate(!update);
    } catch (_) {
      toast.error("Error al obtener los horarios desde el servidor, talvez no exista un horario compartido.");
      replaceGroupList([]);
      setUpdate(!update);
    }
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

export default HorarioView
