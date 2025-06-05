import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { AxiosInstance } from 'axios'; // Asegúrate de importar axios aquí
import { API } from '../api/api';

// Define la URL base para el backend
const BASE_API_URL = 'http://127.0.0.1:3000/'; // URL del backend real

// Crea la instancia de Axios globalmente dentro de este archivo

interface AppContextType {
  axiosInstance: AxiosInstance;
  currentTable: string;
  setCurrentTable: (tableName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de la aplicación
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    console.error("useAppContext debe ser usado dentro de un AppProvider");
    // Se retorna una instancia de Axios por defecto en caso de no estar en un contexto,
    // útil para desarrollo o pruebas aisladas.
    return {
      axiosInstance: API, // Usar la instancia global API como fallback
      currentTable: '',
      setCurrentTable: () => {},
    };
  }
  return context;
};

// --- 1. Modelos TypeScript (models/TableModels.ts) ---

/**
 * @interface IBaseModel
 * @description Interfaz base para cualquier modelo de tabla, asegurando que todos los modelos tengan un ID.
 */
interface IBaseModel {
  id: number; // Cambiado a number para Prisma Int @id
}

/**
 * @interface IForeignKeyEndpoint
 * @description Define la estructura para una relación de llave foránea.
 * @property {string} endpoint - El endpoint para obtener los datos de la llave foránea.
 * @property {string} displayField - El campo del modelo de la llave foránea que se mostrará.
 */
interface IForeignKeyEndpoint {
  endpoint: string;
  displayField: string;
}

/**
 * @interface IFieldConfig
 * @description Configuración para un campo individual de una tabla.
 * @template T - El tipo del modelo de la tabla.
 * @property {keyof T} key - La clave del campo en el modelo de datos.
 * @property {string} label - La etiqueta amigable para mostrar en la UI.
 * @property {'text' | 'number' | 'select' | 'boolean' | 'date'} type - El tipo de entrada para el campo.
 * @property {IForeignKeyEndpoint} [foreignKey] - Opcional: Configuración si el campo es una llave foránea.
 * @property {boolean} [editable] - Opcional: Controla si el campo es editable en el formulario. Por defecto es true.
 */
interface IFieldConfig<T extends IBaseModel> {
  key: keyof T;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'date';
  foreignKey?: IForeignKeyEndpoint;
  editable?: boolean;
}

/**
 * @interface IEndpoints
 * @description Define los endpoints para las operaciones CRUD de una tabla, incluyendo restauración.
 * @property {string} read - Endpoint para leer datos.
 * @property {string} create - Endpoint para crear un nuevo registro.
 * @property {string} update - Endpoint para actualizar un registro existente.
 * @property {string} delete - Endpoint para eliminar un registro.
 * @property {string} [restore] - Opcional: Endpoint para restaurar un registro eliminado lógicamente.
 */
interface IEndpoints {
  read: string;
  create: string;
  update: string;
  delete: string;
  restore?: string;
}

/**
 * @interface ITableConfig
 * @description Configuración completa para una tabla específica.
 * @template T - El tipo del modelo de la tabla (ej. `IUser`, `IProduct`).
 * @property {string} name - El nombre de la tabla (ej. "Usuarios", "Productos").
 * @property {IEndpoints} endpoints - Los endpoints CRUD para esta tabla.
 * @property {Array<IFieldConfig<T>>} fields - La definición de los campos de la tabla.
 * @property {Omit<T, 'id'>} initialData - Datos iniciales para un nuevo registro (sin el ID).
 */
interface ITableConfig<T extends IBaseModel> {
  name: string;
  endpoints: IEndpoints;
  fields: Array<IFieldConfig<T>>;
  initialData: Omit<T, 'id'>;
}

// --- Modelos de Tablas del Backend (derivados de tu esquema Prisma) ---

interface Usuarios extends IBaseModel {
  correo: string;
  deleted_at?: string | null;
}

interface HorariosUsuarios extends IBaseModel {
  nombre: string;
  descripcion: string;
  usuario_id: number;
  deleted_at?: string | null;
}

interface CompartirHorario extends IBaseModel {
  url: string;
  horario_id: number;
  deleted_at?: string | null;
}

interface ComentariosHorario extends IBaseModel {
  comentario: string;
  fecha: string; // Se maneja como string para inputs de fecha o formato de backend
  usuario_id: number;
  horario_id: number;
  deleted_at?: string | null;
}

interface Materias extends IBaseModel {
  nombre: string;
  color: string;
  id_horario: number;
  deleted_at?: string | null;
}

interface DetallesMaterias extends IBaseModel {
  id_materia: number;
  descripcion: string;
  mostrar: boolean;
  orden: number;
  deleted_at?: string | null;
}

interface HorariosMaterias extends IBaseModel {
  id_materia: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  orden: number;
  deleted_at?: string | null;
}

interface DetallesHorariosMaterias extends IBaseModel {
  id_horario_materia: number;
  descripcion: string;
  mostrar: boolean;
  orden: number;
  deleted_at?: string | null;
}

// --- 2. Servicio de API (api/apiService.ts) ---

/**
 * @class ApiService
 * @description Clase para manejar las interacciones con la API.
 */
class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * @method fetchData
   * @description Obtiene datos de un endpoint.
   * @template T - El tipo de los datos a obtener.
   * @param {string} endpoint - El endpoint de la API.
   * @returns {Promise<T[]>} Una promesa que resuelve con un array de datos.
   */
  async fetchData<T extends IBaseModel>(endpoint: string): Promise<T[]> {
    console.log(`[API] Obteniendo datos de: ${endpoint}`);
    const response = await this.axiosInstance.get<T[]>(endpoint);
    return response.data;
  }

  /**
   * @method createData
   * @description Crea un nuevo registro. El ID no se envía.
   * @template T - El tipo de los datos a crear.
   * @param {string} endpoint - El endpoint de la API.
   * @param {Omit<T, 'id'>} data - Los datos del nuevo registro (sin ID).
   * @returns {Promise<T>} Una promesa que resuelve con el registro creado (incluyendo ID).
   */
  async createData<T extends IBaseModel>(endpoint: string, data: Omit<T, 'id'>): Promise<T> {
    console.log(`[API] Creando datos en ${endpoint}:`, data);
    const response = await this.axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  /**
   * @method updateData
   * @description Actualiza un registro existente.
   * @template T - El tipo de los datos a actualizar.
   * @param {string} endpoint - El endpoint de la API (ej. `/users/123`).
   * @param {T} data - Los datos completos del registro a actualizar (con ID).
   * @returns {Promise<T>} Una promesa que resuelve con el registro actualizado.
   */
  async updateData<T extends IBaseModel>(endpoint: string, data: T): Promise<T> {
    console.log(`[API] Actualizando datos en ${endpoint}:`, data);
    const response = await this.axiosInstance.put<T>(endpoint, data); // Usar PUT para actualizaciones completas
    return response.data;
  }

  /**
   * @method deleteData
   * @description Elimina un registro.
   * @param {string} endpoint - El endpoint de la API (ej. `/users/123`).
   * @returns {Promise<void>} Una promesa que resuelve cuando el registro es eliminado.
   */
  async deleteData(endpoint: string): Promise<void> {
    console.log(`[API] Eliminando datos de: ${endpoint}`);
    await this.axiosInstance.delete(endpoint);
  }

  /**
   * @method restoreData
   * @description Restaura un registro eliminado lógicamente.
   * @param {string} endpoint - El endpoint de la API para restaurar (ej. `/HorariosUsuarios/restore`).
   * @param {number} id - El ID del registro a restaurar.
   * @returns {Promise<void>} Una promesa que resuelve cuando el registro es restaurado.
   */
  async restoreData(endpoint: string, id: number): Promise<void> {
    console.log(`[API] Restaurando datos en: ${endpoint}/${id}`);
    await this.axiosInstance.post(`${endpoint}/${id}`); // Asume que la restauración es un POST a /restore/:id
  }
}

// Instancia de Axios para el servicio, ahora usa la instancia API definida arriba
const apiService = new ApiService(API);


// --- 3. Componente Modal (components/Modal.tsx) ---

/**
 * @interface ModalProps
 * @description Propiedades para el componente Modal.
 * @property {boolean} isOpen - Controla la visibilidad del modal.
 * @property {() => void} onClose - Función a llamar cuando el modal se cierra.
 * @property {React.ReactNode} children - El contenido a mostrar dentro del modal.
 * @property {string} title - El título del modal.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

/**
 * @function Modal
 * @description Componente de modal reutilizable.
 * @param {ModalProps} props - Propiedades del modal.
 * @returns {JSX.Element | null} El JSX del modal o null si no está abierto.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none text-2xl font-semibold"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * @interface ConfirmationModalProps
 * @description Propiedades para el componente de Modal de Confirmación.
 * @property {boolean} isOpen - Controla la visibilidad del modal.
 * @property {() => void} onConfirm - Función a llamar cuando se confirma la acción.
 * @property {() => void} onCancel - Función a llamar cuando se cancela la acción.
 * @property {string} message - El mensaje a mostrar en el modal.
 */
interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

/**
 * @function ConfirmationModal
 * @description Componente de modal de confirmación personalizado.
 * @param {ConfirmationModalProps} props - Propiedades del modal de confirmación.
 * @returns {JSX.Element | null} El JSX del modal de confirmación o null si no está abierto.
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirmación">
      <p className="text-gray-700 text-lg mb-6">{message}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md shadow-sm transition duration-300 ease-in-out"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
};


// --- 4. Componente TableManager (components/TableManager.tsx) ---

/**
 * @interface TableManagerProps
 * @description Propiedades para el componente TableManager.
 * @template T - El tipo del modelo de la tabla.
 * @property {ITableConfig<T>} config - La configuración de la tabla a gestionar.
 */
interface TableManagerProps<T extends IBaseModel> {
  config: ITableConfig<T>;
}

/**
 * @function TableManager
 * @description Componente principal para gestionar una tabla, incluyendo CRUD y llaves foráneas.
 * @template T - El tipo del modelo de la tabla.
 * @param {TableManagerProps<T>} props - Propiedades del TableManager.
 * @returns {JSX.Element} El JSX del gestor de tablas.
 */
const TableManager = <T extends IBaseModel>({ config }: TableManagerProps<T>): JSX.Element => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<T | null>(null);
  const [foreignKeyData, setForeignKeyData] = useState<{ [key: string]: any[] }>({});
  const { axiosInstance } = useAppContext(); // Get axiosInstance from context
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState<number | null>(null); // Cambiado a number
  const [showDeleted, setShowDeleted] = useState<boolean>(false);


  const fetchTableData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = config.endpoints.read;
      if (showDeleted) {
        url = `${url}?includeDeleted=true`; // Añadir parámetro para mostrar eliminados
      }
      const result = await apiService.fetchData<T>(url);
      setData(result);
    } catch (err: any) {
      setError(`Error al cargar los datos: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [config.endpoints.read, showDeleted]); // Añadir showDeleted como dependencia

  const fetchForeignKeyData = useCallback(async () => {
    const fkPromises = config.fields
      .filter(field => field.type === 'select' && field.foreignKey)
      .map(async field => {
        const fk = field.foreignKey!;
        try {
          const result = await apiService.fetchData<any>(fk.endpoint);
          return { key: field.key as string, data: result };
        } catch (err: any) {
          console.error(`Error al obtener datos de llave foránea para ${String(field.key)}:`, err);
          return { key: field.key as string, data: [] }; // Retornar array vacío en caso de error
        }
      });

    const results = await Promise.all(fkPromises);
    const newForeignKeyData: { [key: string]: any[] } = {};
    results.forEach(res => {
      if (res) {
        newForeignKeyData[res.key] = res.data;
      }
    });
    setForeignKeyData(newForeignKeyData);
  }, [config.fields]);

  useEffect(() => {
    fetchTableData();
    fetchForeignKeyData();
  }, [fetchTableData, fetchForeignKeyData]);

  const handleCreateOrUpdate = async (formData: T | Omit<T, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      if ('id' in formData && formData.id) {
        // Actualizar registro existente
        await apiService.updateData<T>(`${config.endpoints.update}/${formData.id}`, formData as T);
      } else {
        // Crear nuevo registro (no se envía el ID)
        await apiService.createData<T>(config.endpoints.create, formData as Omit<T, 'id'>);
      }
      setIsModalOpen(false);
      setCurrentRecord(null);
      fetchTableData(); // Recargar datos después de la operación
    } catch (err: any) {
      setError(`Error al guardar los datos: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (recordId: number) => { // Cambiado a number
    setRecordToDeleteId(recordId);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (recordToDeleteId !== null) { // Asegurar que el ID no es nulo
      setLoading(true);
      setError(null);
      try {
        await apiService.deleteData(`${config.endpoints.delete}/${recordToDeleteId}`);
        fetchTableData(); // Recargar datos después de la eliminación
      } catch (err: any) {
        setError(`Error al eliminar el registro: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
        setIsConfirmationModalOpen(false);
        setRecordToDeleteId(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsConfirmationModalOpen(false);
    setRecordToDeleteId(null);
  };

  const handleRestore = async (recordId: number) => {
    setLoading(true);
    setError(null);
    try {
      if (config.endpoints.restore) {
        await apiService.restoreData(config.endpoints.restore, recordId);
        fetchTableData(); // Recargar datos después de la restauración
      } else {
        setError('El endpoint de restauración no está definido para esta tabla.');
      }
    } catch (err: any) {
      setError(`Error al restaurar el registro: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setCurrentRecord(null); // Limpiar registro actual para creación
    setIsModalOpen(true);
  };

  const openEditModal = (record: T) => {
    setCurrentRecord(record); // Establecer registro actual para edición
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg flex-grow h-full overflow-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 pb-2">
        Administrar {config.name}
      </h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowDeleted(!showDeleted)}
          className={`py-2 px-4 rounded-md text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105
            ${showDeleted
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {showDeleted ? 'Ocultar Eliminados' : 'Mostrar Eliminados'}
        </button>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Añadir {config.name.slice(0, -1)}
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-700">Cargando...</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No hay datos para mostrar.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {config.fields.map(field => (
                  <th
                    key={String(field.key)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {field.label}
                  </th>
                ))}
                {/* Añadir columna para deleted_at si existe en el modelo */}
                {'deleted_at' in data[0] && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eliminado
                  </th>
                )}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  {config.fields.map(field => {
                    const value = record[field.key];
                    if (field.type === 'select' && field.foreignKey) {
                      const fkOptions = foreignKeyData[field.key as string] || [];
                      const displayValue = fkOptions.find(opt => opt.id === value)?.[field.foreignKey.displayField] || 'N/A';
                      return (
                        <td key={String(field.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {displayValue}
                        </td>
                      );
                    }
                    if (field.type === 'boolean') {
                      return (
                        <td key={String(field.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {value ? 'Sí' : 'No'}
                        </td>
                      );
                    }
                    if (field.type === 'date') {
                      const dateValue = value ? new Date(String(value)).toLocaleDateString() : 'N/A';
                      return (
                        <td key={String(field.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dateValue}
                        </td>
                      );
                    }
                    return (
                      <td key={String(field.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {String(value)}
                      </td>
                    );
                  })}
                  {/* Mostrar estado de eliminado */}
                  {'deleted_at' in record && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(record as any).deleted_at ? 'Sí' : 'No'}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(record)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 transition duration-150 ease-in-out"
                    >
                      Editar
                    </button>
                    {(record as any).deleted_at ? (
                      <button
                        onClick={() => handleRestore(record.id as number)}
                        className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out mr-3"
                      >
                        Restaurar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(record.id as number)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentRecord ? `Editar ${config.name.slice(0, -1)}` : `Añadir ${config.name.slice(0, -1)}`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            // Si es un registro existente, copiamos sus datos; si no, usamos los datos iniciales (sin ID)
            const newRecord: any = currentRecord ? { ...currentRecord } : { ...config.initialData };

            config.fields.forEach(field => {
              // Solo procesar campos que no sean 'id' para la creación, y campos editables
              if (field.key !== 'id' && (field.editable !== false || currentRecord)) {
                const value = formData.get(String(field.key));
                if (value !== null) {
                  // MODIFICACIÓN CLAVE AQUÍ: Convertir a número si es 'number' O 'select' (llave foránea)
                  if (field.type === 'number' || field.type === 'select') {
                    newRecord[field.key] = Number(value);
                  } else if (field.type === 'boolean') {
                    newRecord[field.key] = value === 'true'; // Convertir string a booleano
                  } else if (field.type === 'date') {
                    // Si el backend espera un formato específico, se puede ajustar aquí
                    newRecord[field.key] = value;
                  } else {
                    newRecord[field.key] = String(value);
                  }
                }
              }
            });
            handleCreateOrUpdate(newRecord as T);
          }}
          className="space-y-4"
        >
          {config.fields.map(field => {
            // No renderizar el campo ID si estamos creando un nuevo registro o si no es editable
            if (field.key === 'id' && !currentRecord) return null;
            if (field.editable === false && !currentRecord) return null; // No mostrar campos no editables al crear

            let inputValue = currentRecord ? String(currentRecord[field.key]) : '';
            if (field.type === 'boolean' && currentRecord) {
              inputValue = currentRecord[field.key] ? 'true' : 'false';
            } else if (field.type === 'date' && currentRecord && currentRecord[field.key]) {
               // Formatear la fecha para el input type="date"
               inputValue = new Date(String(currentRecord[field.key])).toISOString().split('T')[0];
            }


            return (
              <div key={String(field.key)}>
                <label htmlFor={String(field.key)} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}:
                </label>
                {field.type === 'select' && field.foreignKey ? (
                  <select
                    id={String(field.key)}
                    name={String(field.key)}
                    defaultValue={inputValue}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    disabled={field.editable === false && !!currentRecord} // Deshabilitar si no es editable y estamos editando
                  >
                    <option value="">Selecciona una opción</option>
                    {foreignKeyData[field.key as string]?.map(option => (
                      <option key={option.id} value={option.id}>
                        {option[field.foreignKey!.displayField]}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'boolean' ? (
                  <select
                    id={String(field.key)}
                    name={String(field.key)}
                    defaultValue={inputValue}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    disabled={field.editable === false && !!currentRecord}
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                    id={String(field.key)}
                    name={String(field.key)}
                    defaultValue={inputValue}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required={field.key !== 'id'} // ID no es requerido para creación
                    readOnly={field.editable === false && !!currentRecord} // Apply readOnly based on editable prop and if we are editing
                    disabled={field.editable === false && !!currentRecord} // Disabled property
                  />
                )}
              </div>
            );
          })}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md shadow-sm transition duration-300 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              {currentRecord ? 'Guardar Cambios' : 'Crear'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer."
      />
    </div>
  );
};


// --- 5. Componente Principal App (App.tsx) ---

// Definición de las configuraciones de las tablas
const usuariosTableConfig: ITableConfig<Usuarios> = {
  name: 'Usuarios',
  endpoints: {
    read: `${BASE_API_URL}usuarios`, // Suponiendo /usuarios para la tabla de usuarios
    create: `${BASE_API_URL}usuarios`,
    update: `${BASE_API_URL}usuarios`,
    delete: `${BASE_API_URL}usuarios`,
    restore: `${BASE_API_URL}usuarios/restore`, // Endpoint de restauración
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    { key: 'correo', label: 'Email', type: 'text' },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { correo: '' },
};

const horariosUsuariosTableConfig: ITableConfig<HorariosUsuarios> = {
  name: 'Horarios Usuarios',
  endpoints: {
    read: `${BASE_API_URL}HorariosUsuarios/all`,
    create: `${BASE_API_URL}HorariosUsuarios`,
    update: `${BASE_API_URL}HorariosUsuarios`, // Asumiendo PUT /HorariosUsuarios/:id
    delete: `${BASE_API_URL}HorariosUsuarios`, // Asumiendo DELETE /HorariosUsuarios/:id
    restore: `${BASE_API_URL}HorariosUsuarios/restore`, // Asumiendo POST /HorariosUsuarios/restore/:id
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'descripcion', label: 'Descripción', type: 'text' },
    {
      key: 'usuario_id',
      label: 'Usuario',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}usuarios`, displayField: 'correo' } // Asumiendo endpoint para usuarios
    },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { nombre: '', descripcion: '', usuario_id: 0 },
};

const compartirHorarioTableConfig: ITableConfig<CompartirHorario> = {
  name: 'Compartir Horario',
  endpoints: {
    read: `${BASE_API_URL}CompartirHorario/all`,
    create: `${BASE_API_URL}CompartirHorario`,
    update: `${BASE_API_URL}CompartirHorario`,
    delete: `${BASE_API_URL}CompartirHorario`,
    restore: `${BASE_API_URL}CompartirHorario/restore`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    { key: 'url', label: 'URL', type: 'text' },
    {
      key: 'horario_id',
      label: 'Horario',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}HorariosUsuarios/all`, displayField: 'nombre' }
    },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { url: '', horario_id: 0 },
};

const comentariosHorarioTableConfig: ITableConfig<ComentariosHorario> = {
  name: 'Comentarios Horario',
  endpoints: {
    read: `${BASE_API_URL}ComentariosHorario/all`,
    create: `${BASE_API_URL}ComentariosHorario`,
    update: `${BASE_API_URL}ComentariosHorario`,
    delete: `${BASE_API_URL}ComentariosHorario`,
    restore: `${BASE_API_URL}ComentariosHorario/restore`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    { key: 'comentario', label: 'Comentario', type: 'text' },
    { key: 'fecha', label: 'Fecha', type: 'date' },
    {
      key: 'usuario_id',
      label: 'Usuario',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}usuarios`, displayField: 'nombre' }
    },
    {
      key: 'horario_id',
      label: 'Horario',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}HorariosUsuarios/all`, displayField: 'nombre' }
    },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { comentario: '', fecha: new Date().toISOString().split('T')[0], usuario_id: 0, horario_id: 0 },
};

const materiasTableConfig: ITableConfig<Materias> = {
  name: 'Materias',
  endpoints: {
    read: `${BASE_API_URL}Materias/all`,
    create: `${BASE_API_URL}Materias`,
    update: `${BASE_API_URL}Materias`,
    delete: `${BASE_API_URL}Materias`,
    restore: `${BASE_API_URL}Materias/restore`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'color', label: 'Color', type: 'text' },
    {
      key: 'id_horario',
      label: 'Horario',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}HorariosUsuarios/all`, displayField: 'nombre' }
    },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { nombre: '', color: '#000000', id_horario: 0 },
};

const detallesMateriasTableConfig: ITableConfig<DetallesMaterias> = {
  name: 'Detalles Materias',
  endpoints: {
    read: `${BASE_API_URL}DetallesMaterias/all`,
    create: `${BASE_API_URL}DetallesMaterias`,
    update: `${BASE_API_URL}DetallesMaterias`,
    delete: `${BASE_API_URL}DetallesMaterias`,
    restore: `${BASE_API_URL}DetallesMaterias/restore`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    {
      key: 'id_materia',
      label: 'Materia',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}Materias/all`, displayField: 'nombre' }
    },
    { key: 'descripcion', label: 'Descripción', type: 'text' },
    { key: 'mostrar', label: 'Mostrar', type: 'boolean' },
    { key: 'orden', label: 'Orden', type: 'number' },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { id_materia: 0, descripcion: '', mostrar: true, orden: 0 },
};

const horariosMateriasTableConfig: ITableConfig<HorariosMaterias> = {
  name: 'Horarios Materias',
  endpoints: {
    read: `${BASE_API_URL}HorariosMaterias/all`,
    create: `${BASE_API_URL}HorariosMaterias`,
    update: `${BASE_API_URL}HorariosMaterias`,
    delete: `${BASE_API_URL}HorariosMaterias`,
    restore: `${BASE_API_URL}HorariosMaterias/restore`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    {
      key: 'id_materia',
      label: 'Materia',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}Materias/all`, displayField: 'nombre' }
    },
    { key: 'dia', label: 'Día', type: 'text' },
    { key: 'hora_inicio', label: 'Hora Inicio', type: 'text' },
    { key: 'hora_fin', label: 'Hora Fin', type: 'text' },
    { key: 'orden', label: 'Orden', type: 'number' },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { id_materia: 0, dia: '', hora_inicio: '', hora_fin: '', orden: 0 },
};

const detallesHorariosMateriasTableConfig: ITableConfig<DetallesHorariosMaterias> = {
  name: 'Detalles Horarios Materias',
  endpoints: {
    read: `${BASE_API_URL}DetallesHorariosMaterias/all`,
    create: `${BASE_API_URL}DetallesHorariosMaterias`,
    update: `${BASE_API_URL}DetallesHorariosMaterias`,
    delete: `${BASE_API_URL}DetallesHorariosMaterias`,
    restore: `${BASE_API_URL}DetallesHorariosMaterias/restore`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'number', editable: false },
    {
      key: 'id_horario_materia',
      label: 'Horario Materia',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}HorariosMaterias/all`, displayField: 'dia' } // Display "dia" or another relevant field
    },
    { key: 'descripcion', label: 'Descripción', type: 'text' },
    { key: 'mostrar', label: 'Mostrar', type: 'boolean' },
    { key: 'orden', label: 'Orden', type: 'number' },
    { key: 'deleted_at', label: 'Fecha Eliminación', type: 'date', editable: false },
  ],
  initialData: { id_horario_materia: 0, descripcion: '', mostrar: true, orden: 0 },
};


const tableConfigs: { [key: string]: ITableConfig<any> } = {
  usuarios: usuariosTableConfig,
  horariosUsuarios: horariosUsuariosTableConfig,
  compartirHorario: compartirHorarioTableConfig,
  // comentariosHorario: comentariosHorarioTableConfig,
  materias: materiasTableConfig,
  detallesMaterias: detallesMateriasTableConfig,
  horariosMaterias: horariosMateriasTableConfig,
  detallesHorariosMaterias: detallesHorariosMateriasTableConfig,
};

const App: React.FC = () => {
  const [currentTable, setCurrentTable] = useState<string>('usuarios'); // Default a 'usuarios'

  return (
    <AppContext.Provider value={{ axiosInstance: API, currentTable, setCurrentTable }}>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col p-4 sm:p-6">
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          .animate-fade-in-up {
            animation: fadeInFromBottom 0.3s ease-out;
          }
          @keyframes fadeInFromBottom {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          `}
        </style>
        <header className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-3xl font-extrabold text-blue-800 mb-4 sm:mb-0">Panel Administrativo</h1>
          <nav className="flex flex-wrap gap-2">
            {Object.keys(tableConfigs).map(key => (
              <button
                key={key}
                onClick={() => setCurrentTable(key)}
                className={`py-2 px-4 rounded-md text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105
                  ${currentTable === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {tableConfigs[key].name}
              </button>
            ))}
          </nav>
        </header>

        <main className="flex-grow">
          {currentTable && tableConfigs[currentTable] ? (
            <TableManager config={tableConfigs[currentTable]} />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-600">
              Selecciona una tabla para empezar a administrar.
            </div>
          )}
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
