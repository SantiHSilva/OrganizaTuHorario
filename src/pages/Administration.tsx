import React, { useState, useEffect, useCallback, createContext } from 'react';
import { AxiosInstance } from 'axios';
import { API, API_URL } from '../api/api';

// Define the API URL
const BASE_API_URL = API_URL

interface AppContextType {
  axiosInstance: AxiosInstance;
  currentTable: string;
  setCurrentTable: (tableName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


// --- 1. Modelos TypeScript (models/TableModels.ts) ---

/**
 * @interface IBaseModel
 * @description Interfaz base para cualquier modelo de tabla, asegurando que todos los modelos tengan un ID.
 */
interface IBaseModel {
  id: string;
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
 * @property {'text' | 'number' | 'select'} type - El tipo de entrada para el campo (texto, número, o select para llaves foráneas).
 * @property {IForeignKeyEndpoint} [foreignKey] - Opcional: Configuración si el campo es una llave foránea.
 */
interface IFieldConfig<T extends IBaseModel> {
  key: keyof T;
  label: string;
  type: 'text' | 'number' | 'select';
  foreignKey?: IForeignKeyEndpoint;
  editable?: boolean; // New property to control field editability
}

/**
 * @interface IEndpoints
 * @description Define los endpoints para las operaciones CRUD de una tabla.
 * @property {string} read - Endpoint para leer datos.
 * @property {string} create - Endpoint para crear un nuevo registro.
 * @property {string} update - Endpoint para actualizar un registro existente.
 * @property {string} delete - Endpoint para eliminar un registro.
 */
interface IEndpoints {
  read: string;
  create: string;
  update: string;
  delete: string;
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



// --- Modelos de Ejemplo ---

/*

model HorariosUsuarios{
  id Int @id @default(autoincrement())

  nombre String @db.Text()
  descripcion String @db.Text()

  usuario_id Int
  deleted_at DateTime?

  Usuarios Usuarios @relation(fields: [usuario_id], references: [id])
  
  CompartirHorario CompartirHorario[]
  ComentariosHorario ComentariosHorario[]
  Materias Materias[]
}

model CompartirHorario{
  id Int @id @default(autoincrement())

  url String @db.Text() @unique
  horario_id Int @unique
  deleted_at DateTime?

  HorariosUsuarios HorariosUsuarios @relation(fields: [horario_id], references: [id])
}

model ComentariosHorario{
  id Int @id @default(autoincrement())

  comentario String @db.Text()
  fecha DateTime @db.Timestamp()

  usuario_id Int
  horario_id Int
  deleted_at DateTime?

  Usuarios Usuarios @relation(fields: [usuario_id], references: [id])
  HorariosUsuarios HorariosUsuarios @relation(fields: [horario_id], references: [id])
}

model Materias{
  id Int @id @default(autoincrement())

  nombre String @db.Text()
  color String @db.VarChar(15)
  id_horario Int
  deleted_at DateTime?

  HorariosUsuarios HorariosUsuarios @relation(fields: [id_horario], references: [id])

  HorariosMaterias HorariosMaterias[]
  DetallesMaterias DetallesMaterias[]
}

model DetallesMaterias{
  id Int @id @default(autoincrement())

  id_materia Int
  descripcion String @db.Text()
  mostrar Boolean @default(true)
  orden Int // Orden de la materia en el horario.
  deleted_at DateTime?

  Materias Materias @relation(fields: [id_materia], references: [id])
}

model HorariosMaterias{
  id Int @id @default(autoincrement())

  id_materia Int
  dia String @db.VarChar(1) // Indice del día.
  hora_inicio String @db.VarChar(5) // Formato 24 horas.
  hora_fin String @db.VarChar(5) // Formato 24 horas.
  orden Int // Orden de la materia en el horario.

  deleted_at DateTime?

  Materias Materias @relation(fields: [id_materia], references: [id])

  DetallesHorariosMaterias DetallesHorariosMaterias[]
}

model DetallesHorariosMaterias{
  id Int @id @default(autoincrement())

  id_horario_materia Int
  descripcion String @db.Text()
  mostrar Boolean @default(true)
  orden Int // Orden de la materia en el horario.
  deleted_at DateTime?

  HorariosMaterias HorariosMaterias @relation(fields: [id_horario_materia], references: [id])
}

*/

interface HorariosUsuarios extends IBaseModel {
  nombre: string;
  descripcion: string;
  usuario_id: number;
}

interface CompartirHorario extends IBaseModel {
  url: string;
  horario_id: number;
}

interface ComentariosHorario extends IBaseModel {
  comentario: string;
  fecha: Date;
  usuario_id: number;
  horario_id: number;
}

interface Materias extends IBaseModel {
  nombre: string;
  color: string;
  id_horario: number;
}

interface DetallesMaterias extends IBaseModel {
  id_materia: number;
  descripcion: string;
  mostrar: boolean;
  orden: number; // Orden de la materia en el horario.
}

interface HorariosMaterias extends IBaseModel {
  id_materia: number;
  dia: string; // Indice del día.
  hora_inicio: string; // Formato 24 horas.
  hora_fin: string; // Formato 24 horas.
  orden: number; // Orden de la materia en el horario.
}

interface DetallesHorariosMaterias extends IBaseModel {
  id_horario_materia: number;
  descripcion: string;
  mostrar: boolean;
  orden: number; // Orden de la materia en el horario.
}

/**
 * @interface IUser
 * @description Modelo de ejemplo para un usuario.
 */
interface IUser extends IBaseModel {
  name: string;
  email: string;
}

/**
 * @interface IProduct
 * @description Modelo de ejemplo para un producto.
 */
interface IProduct extends IBaseModel {
  name: string;
  price: number;
  createdBy: string; // Foreign key to User ID
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
    console.log(`[API] Fetching data from: ${endpoint}`);
    const response = await this.axiosInstance.get<T[]>(endpoint);
    return response.data;
  }

  /**
   * @method createData
   * @description Crea un nuevo registro.
   * @template T - El tipo de los datos a crear.
   * @param {string} endpoint - El endpoint de la API.
   * @param {Omit<T, 'id'>} data - Los datos del nuevo registro (sin ID).
   * @returns {Promise<T>} Una promesa que resuelve con el registro creado (incluyendo ID).
   */
  async createData<T extends IBaseModel>(endpoint: string, data: Omit<T, 'id'>): Promise<T> {
    console.log(`[API] Creating data at ${endpoint}:`, data);
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
    console.log(`[API] Updating data at ${endpoint}:`, data);
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
    console.log(`[API] Deleting data from: ${endpoint}`);
    await this.axiosInstance.delete(endpoint);
  }
}

// Instancia de Axios para el servicio
const axiosInstance = API
const apiService = new ApiService(axiosInstance);


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
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState<string | null>(null);


  const fetchTableData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiService.fetchData<T>(config.endpoints.read);
      setData(result);
    } catch (err: any) {
      setError(`Error al cargar los datos: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [config.endpoints.read]);

  const fetchForeignKeyData = useCallback(async () => {
    const fkPromises = config.fields
      .filter(field => field.type === 'select' && field.foreignKey)
      .map(async field => {
        const fk = field.foreignKey!;
        try {
          const result = await apiService.fetchData<any>(fk.endpoint);
          return { key: field.key as string, data: result };
        } catch (err: any) {
          console.error(`Error fetching foreign key data for ${String(field.key)}:`, err);
          return { key: field.key as string, data: [] }; // Return empty array on error
        }
      });

    const results = await Promise.all(fkPromises);
    const newForeignKeyData: { [key: string]: any[] } = {};
    results.forEach(res => {
      if (res) { // Ensure res is not null/undefined
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
        // Update existing record
        await apiService.updateData<T>(`${config.endpoints.update}/${formData.id}`, formData as T);
      } else {
        // Create new record
        await apiService.createData<T>(config.endpoints.create, formData as Omit<T, 'id'>);
      }
      setIsModalOpen(false);
      setCurrentRecord(null);
      fetchTableData(); // Refresh data after operation
    } catch (err: any) {
      setError(`Error al guardar los datos: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (recordId: string) => {
    setRecordToDeleteId(recordId);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (recordToDeleteId) {
      setLoading(true);
      setError(null);
      try {
        await apiService.deleteData(`${config.endpoints.delete}/${recordToDeleteId}`);
        fetchTableData(); // Refresh data after deletion
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

  const openCreateModal = () => {
    setCurrentRecord(null); // Clear current record for creation
    setIsModalOpen(true);
  };

  const openEditModal = (record: T) => {
    setCurrentRecord(record); // Set current record for editing
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg flex-grow h-full overflow-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 pb-2">
        Administrar {config.name}
      </h1>

      <div className="flex justify-end mb-4">
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
                    return (
                      <td key={String(field.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {String(value)}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(record)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 transition duration-150 ease-in-out"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                    >
                      Eliminar
                    </button>
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
            const newRecord: any = currentRecord ? { ...currentRecord } : { ...config.initialData };

            config.fields.forEach(field => {
              const value = formData.get(String(field.key));
              if (value !== null) {
                newRecord[field.key] = field.type === 'number' ? Number(value) : String(value);
              }
            });

            handleCreateOrUpdate(newRecord as T);
          }}
          className="space-y-4"
        >
          {config.fields.map(field => (
            <div key={String(field.key)}>
              <label htmlFor={String(field.key)} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}:
              </label>
              {field.type === 'select' && field.foreignKey ? (
                <select
                  id={String(field.key)}
                  name={String(field.key)}
                  defaultValue={currentRecord ? String(currentRecord[field.key]) : ''}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {foreignKeyData[field.key as string]?.map(option => (
                    <option key={option.id} value={option.id}>
                      {option[field.foreignKey!.displayField]}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  id={String(field.key)}
                  name={String(field.key)}
                  defaultValue={currentRecord ? String(currentRecord[field.key]) : ''}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  readOnly={field.editable === false} // Apply readOnly based on editable prop
                />
              )}
            </div>
          ))}
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
const userTableConfig: ITableConfig<IUser> = {
  name: 'Usuarios',
  endpoints: {
    read: `${BASE_API_URL}users`,
    create: `${BASE_API_URL}users`,
    update: `${BASE_API_URL}users`,
    delete: `${BASE_API_URL}users`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'text', editable: false }, // ID is not editable
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
  ],
  initialData: { name: '', email: '' },
};

const productTableConfig: ITableConfig<IProduct> = {
  name: 'Productos',
  endpoints: {
    read: `${BASE_API_URL}products`,
    create: `${BASE_API_URL}products`,
    update: `${BASE_API_URL}products`,
    delete: `${BASE_API_URL}products`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'text', editable: false }, // ID is not editable
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'price', label: 'Precio', type: 'number' },
    {
      key: 'createdBy',
      label: 'Creado Por',
      type: 'select',
      foreignKey: { endpoint: `${BASE_API_URL}users`, displayField: 'name' },
    },
  ],
  initialData: { name: '', price: 0, createdBy: '' },
};

const horariosUsuariosTableConfig: ITableConfig<HorariosUsuarios> = {
  name: 'Horarios Usuarios',
  endpoints: {
    read: `${BASE_API_URL}HorariosUsuarios/all`,
    create: `${BASE_API_URL}HorariosUsuarios/save`,
    update: `${BASE_API_URL}HorariosUsuarios`,
    delete: `${BASE_API_URL}HorariosUsuarios`,
  },
  fields: [
    { key: 'id', label: 'ID', type: 'text', editable: false }, // ID is not editable
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'descripcion', label: 'Descripción', type: 'text' },
    // { key: 'usuario_id', label: 'Usuario ID', type: 'select', foreignKey: { endpoint: `${BASE_API_URL}users`, displayField: 'name' } },
  ]
}

const tableConfigs: { [key: string]: ITableConfig<any> } = {
  users: userTableConfig,
  products: productTableConfig,
  horariosUsuarios: horariosUsuariosTableConfig,
};

const App: React.FC = () => {
  const [currentTable, setCurrentTable] = useState<string>('users'); // Default to 'users'

  return (
    <AppContext.Provider value={{ axiosInstance, currentTable, setCurrentTable }}>
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
