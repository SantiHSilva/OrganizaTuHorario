export interface Profile {
  id:         number;
  correo:     string;
  password:   string;
  verificado: boolean;
  persona_id: number;
  rol_id:     number;
  deleted_at: null | Date;
  Personas:   Personas;
  Roles:      Roles;
}

export interface Personas {
  id:                     number;
  nombres:                string;
  apellidos:              string;
  sexo:                   boolean;
  telefono:               string;
  direccion_notificacion: string;
  direccion_domicilio:    string;
  nacionalidad_id:        number;
  deleted_at:             null | Date;
  Nacionalidad:           Roles;
}

export interface Roles {
  id:          number;
  codigo?:     string;
  descripcion: string;
  deleted_at:  null | Date;
  Permisos?:   Permiso[];
}

export interface Permiso {
  id:         number;
  tabla:      string;
  agregar:    boolean;
  modificar:  boolean;
  eliminar:   boolean;
  leer:       boolean;
  rol_id:     number;
  deleted_at: null | Date;
}
