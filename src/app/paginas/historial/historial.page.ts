import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth-service/auth.service';
import { NavController } from '@ionic/angular';
import { Auth, authState } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/servicios/usuario-service/usuario.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  usuario?:any = this.usuarioService.usuario;
  validacion:boolean = true;

  constructor(private usuarioService: UsuarioService, private auth: Auth, private authService:AuthService) { }

  ngOnInit() {
    if(!this.usuario){
      authState(this.auth).subscribe((currentUser) => {
        if (currentUser) {
          const uid = currentUser.uid;
          this.usuarioService.obtenerUsuarioPorId(uid).subscribe(
            (data) => {
              this.usuarioService.usuario = this.usuario = data || null;
              this.validacion = this.usuario?.estado;
              console.log('usuario: ', this.usuario); //Para ver los valores que esta trayendo
            },
            (error) => {
              console.error('Error al obtener el usuario:', error);
              this.cerrarSesion();
            }
          );
        }
      })
    }else{
      this.validacion = this.usuario?.estado;
    }
  }

  ionViewWillEnter(){

  }

  cerrarSesion(){
    this.authService.logout().then(()=>this.usuarioService.usuario = undefined);
  }
}
