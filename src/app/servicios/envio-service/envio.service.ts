import { Injectable } from '@angular/core';
import { Database, ref, set, update, onValue, push, query, orderByChild, equalTo } from '@angular/fire/database';
import { combineLatest, Observable } from 'rxjs';
import { Direccion } from 'src/app/clases/direccion/direccion';
import { Envio } from 'src/app/clases/envio/envio';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  envio?: Envio;

  constructor(private db: Database) {} 

  async registrarEnvio(nombre:string, emisor: string, receptor: string, direccion: Direccion) {
    const envio = new Envio(nombre, emisor, receptor, direccion);
    try {
      const enviosRef = ref(this.db, 'envios');
      const nuevoEnvioRef = push(enviosRef);
      await set(nuevoEnvioRef, { ...envio, id: nuevoEnvioRef.key }); 
      console.log('Envio registrado en Realtime Database con ID:', nuevoEnvioRef.key);
    } catch (error) {
      console.log('Error al guardar envio en Realtime Database:', error);
    }
  }

  obtenerEnvioPorId(uid: string): Observable<any> {
    const envioRef = ref(this.db, `envios/${uid}`); 
    return new Observable(observer => {
      onValue(envioRef, (item) => {
        const data = item.val(); 
        observer.next(data);
      }, {
        onlyOnce: false
      });
    });
  }

  async actualizarEnvio(id: string, estado: string) {
    const envioRef = ref(this.db, `envios/${id}`); 
    try {
      await update(envioRef, {
        estado: estado
      });
      console.log('Envio actualizado en Realtime Database');
    } catch (error) {
      console.log('Error al actualizar envio en Realtime Database:', error);
    }
  }

  async aceptarEnvio(id: string, transportista: string, codigo:string) {

    const envioRef = ref(this.db, `envios/${id}`); 
    try {
      await update(envioRef, {
        estado:'aceptado',
        transportista: transportista,
        codigo: codigo
      });
      console.log('Envio aceptado en Realtime Database');
    } catch (error) {
      console.log('Error al aceptar envio en Realtime Database:', error);
    }
  }

  async viajandoEnvio(id: string, datos: any) {
    const envioRef = ref(this.db, `envios/${id}`); 
    try {
      await update(envioRef, {
        estado: 'viajando',
        receptorEntrega: datos
      });
      console.log('Envio en viaje en Realtime Database');
    } catch (error) {
      console.log('Error al cambiar de estado envio en Realtime Database:', error);
    }
  }

  async entregarEnvio(id: string, datos: any) {
    const envioRef = ref(this.db, `envios/${id}`); 
    try {
      await update(envioRef, {
        estado: 'entregado',
        receptorEntrega: datos
      });
      console.log('Envio entregado en Realtime Database');
    } catch (error) {
      console.log('Error al entregar envio en Realtime Database:', error);
    }
  }

  obtenerEnviosPorDni(dni: string): Observable<any[]> {
    const enviosRef = ref(this.db, 'envios');
    
    const emisorQuery = query(enviosRef, orderByChild('emisor'), equalTo(dni));
    const receptorQuery = query(enviosRef, orderByChild('receptor'), equalTo(dni));
    
    const emisorObservable = new Observable<any[]>(observer => {
      const envios: any[] = [];
      onValue(emisorQuery, (snapshot) => {
        snapshot.forEach((item) => {
          envios.push(item.val());
        });
        observer.next(envios);
      });
    });
  
    const receptorObservable = new Observable<any[]>(observer => {
      const envios: any[] = [];
      onValue(receptorQuery, (snapshot) => {
        snapshot.forEach((item) => {
          envios.push(item.val());
        });
        observer.next(envios);
      });
    });
  
    return new Observable<any[]>(observer => {
      combineLatest([emisorObservable, receptorObservable]).subscribe(([emisorEnvios, receptorEnvios]) => {
        const todosEnvios = [...emisorEnvios, ...receptorEnvios];
        observer.next(todosEnvios);
      });
    });
  }

  obtenerEnviosPorTransportista(transportista: string): Observable<any[]> {
    const enviosRef = ref(this.db, 'envios');
    const transportistaQuery = query(enviosRef, orderByChild('transportista'), equalTo(transportista));
  
    return new Observable(observer => {
      const envios: any[] = [];
      
      onValue(transportistaQuery, (snapshot) => {
        envios.length = 0; 
        snapshot.forEach((item) => {
          envios.push(item.val());
        });
        observer.next(envios);
      }, {
        onlyOnce: false
      });
    });
  }
  obtenerEnviosProcesando(): Observable<any[]> {
    const enviosRef = ref(this.db, 'envios');
    const procesandoQuery = query(enviosRef, orderByChild('estado'), equalTo('procesando'));
  
    return new Observable(observer => {
      const envios: any[] = [];
  
      onValue(procesandoQuery, (snapshot) => {
        envios.length = 0;  
        snapshot.forEach((item) => {
          envios.push(item.val());
        });
        observer.next(envios);
      }, {
        onlyOnce: false 
      });
    });
  }

}