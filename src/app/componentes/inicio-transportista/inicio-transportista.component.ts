import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Envio } from 'src/app/clases/envio/envio';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { EnvioService } from 'src/app/servicios/envio-service/envio.service';
import { UsuarioService } from 'src/app/servicios/usuario-service/usuario.service';

@Component({
  selector: 'app-inicio-transportista',
  templateUrl: './inicio-transportista.component.html',
  styleUrls: ['./inicio-transportista.component.scss'],
})
export class InicioTransportistaComponent  implements OnInit {

  listado:Envio [] = [];
  listadoNuevos:Envio [] = [];
  usuario?:Usuario = this.usuarioService.usuario;

  private prevListadoLength = 0;

  constructor(private usuarioService:UsuarioService, private navController:NavController,private envioService:EnvioService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.envioService.obtenerEnviosProcesando().subscribe((value)=>{
      this.listadoNuevos = value;
    },
    (error) => {
      console.error('Error al obtener el envios:', error);
    })
    if(this.usuario?.dni){
      this.envioService.obtenerEnviosPorTransportista(this.usuario.dni.toString()).subscribe((value)=>{
        this.listado = value;
      },
      (error) => {
        console.error('Error al obtener el envios:', error);
      })
    }

    this.handleRefresh();


  }

  ngDoCheck() {
    // Detectar cambios en listado o cualquier otra lógica personalizada
    if (this.listado.length !== this.prevListadoLength) {
      console.log('Cambio detectado en listado.');
      this.prevListadoLength = this.listado.length;
      this.handleRefresh();
    }

    // Forzar una comprobación de cambios si es necesario
    this.cdr.detectChanges();
  }

  
  verEnvio(id:string){
    this.navController.navigateForward("/detalle-pedido/"+ id)
  }

  handleRefresh(event?: any) {
    setTimeout(() => {
      if(this.usuario?.dni){
        this.envioService.obtenerEnviosPorTransportista(this.usuario.dni.toString()).subscribe((value)=>{
          this.listado = value;
        },
        (error) => {
          console.error('Error al obtener el envios:', error);
        });
      } 
    if (event && event.target) { 
      
      event.target.complete();
    }
    }, 200);

  }
}
