import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direccion } from 'src/app/clases/direccion/direccion';
import { EnvioService } from 'src/app/servicios/envio-service/envio.service';
import { UsuarioService } from 'src/app/servicios/usuario-service/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-envio',
  templateUrl: './nuevo-envio.page.html',
  styleUrls: ['./nuevo-envio.page.scss'],
})
export class NuevoEnvioPage implements OnInit {

  envioForm!: FormGroup;
  dniEmisor: string = ''; 
  usuario:any = this.usuarioService.usuario;

  constructor(
    private fb: FormBuilder,
    private envioService: EnvioService,
    private auth: Auth,
    private usuarioService: UsuarioService ,
    private navController: NavController
  ) {
    this.envioForm = this.fb.group({
      dniReceptor: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nombre: ['', Validators.required],
      calle: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(!this.usuario){
      authState(this.auth).subscribe((currentUser) => {
        if (currentUser) {
          const uid = currentUser.uid;
          this.usuarioService.obtenerUsuarioPorId(uid).subscribe(
            (data) => {
              this.usuario = data;
              this.dniEmisor = this.usuario?.dni || ''; 
            },
            (error) => {
              console.error('Error al obtener el usuario:', error);
            }
          );
        } else {
          console.log('No hay un usuario autenticado');
        }
      });
    }else{
      this.dniEmisor = this.usuario?.dni || ''; 
    }
  }

  onSubmit() {
    if (this.envioForm.valid) {
      const { nombre,dniReceptor,calle, localidad, provincia } = this.envioForm.value;

      const direccion: Direccion = {
        calle,
        localidad,
        provincia
      };

      const nuevoEnvio = {
        nombre: nombre,
        emisor: this.dniEmisor,
        receptor: dniReceptor,
        direccion:direccion
      };
      this.envioService.registrarEnvio(nuevoEnvio.nombre,nuevoEnvio.emisor, nuevoEnvio.receptor, nuevoEnvio.direccion);
      this.navController.navigateForward('/home');
      console.log('Pedido creado:', nuevoEnvio);
    } else {
      console.log('Formulario no válido');
    }
  }
}