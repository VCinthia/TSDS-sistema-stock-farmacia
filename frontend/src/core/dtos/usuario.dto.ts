import {eRol} from "../enums/rol.enum";

export class UsuarioDTO {
    nombre?: string;
    email?: string;
    password?: string;
    rol?: eRol; 
    sucursal?: string;
}