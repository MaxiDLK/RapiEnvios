import { Direccion } from "../direccion/direccion";

export class Usuario {
    id?: string;          
    email: string;        
    estado: boolean;        
    nombre: string = "";       
    apellido: string = "";   
    dni: number | null = null;         
    fechaNacimiento: string = "";
    direccion: Direccion ;
    tipo:string = "";

    constructor(email: string,uid:string) {
        this.email = email;
        this.id = uid;
        this.estado = false; 
        this.direccion = { calle: '', localidad: '', provincia: '' };
    }
}
