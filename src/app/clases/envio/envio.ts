import { Direccion } from '../direccion/direccion';

export class Envio {
    emisor:string = "";
    receptor:string = "";
    transportista:string = "";
    id:string = "";
    direccion?:Direccion;
    estado:string = "";
    codigo:any;
    nombre:string = "";

    constructor(nombre:string,emisor:string,receptor:string,direccion:Direccion){
        this.nombre = nombre;
        this.emisor = emisor;
        this.receptor = receptor;
        this.direccion = direccion;
        this.estado = "procesando";
    }
}
