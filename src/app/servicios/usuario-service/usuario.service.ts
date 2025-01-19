import { Injectable } from '@angular/core';
import { Database, ref, set, update, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Direccion } from 'src/app/clases/direccion/direccion';
import { Usuario } from 'src/app/clases/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario?:Usuario;

  constructor(private db: Database) {} 

  async registrarUsuario(email: string, uid: string) {
    const usuario = new Usuario(email, uid);
    try {
      const userRef = ref(this.db, `usuarios/${uid}`); 
      await set(userRef, usuario); 
      console.log('Usuario registrado en Realtime Database');
    } catch (error) {
      console.log('Error al guardar usuario en Realtime Database:', error);
    }
  }

  obtenerUsuarioPorId(uid: string): Observable<any> {
    const userRef = ref(this.db, `usuarios/${uid}`); 
    return new Observable(observer => {
      onValue(userRef, (item) => {
        const data = item.val(); 
        observer.next(data);
      }, {
        onlyOnce: false
      });
    });
  }

  async validarUsuario(id: string, dni: string, nombre: string, apellido: string, fecha: string, direccion: Direccion,tipo: string) {
    const userRef = ref(this.db, `usuarios/${id}`); 
    try {
      await update(userRef, {
        estado: true,
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fecha,
        direccion: direccion,
        tipo: tipo
      });
      console.log('Usuario validado en Realtime Database');
    } catch (error) {
      console.log('Error al validar usuario en Realtime Database:', error);
    }
  }

  extraerDatos(lectura: string) {
    const datos = lectura.split('@');
    if (datos.length < 8) {
      console.error('La cadena no tiene suficientes datos');
      return null;
    }

    const apellido = datos[1];
    const nombre = datos[2];
    const dni = datos[4];
    const fecha = datos[6];

    return { apellido, nombre, dni, fecha };
  }
}