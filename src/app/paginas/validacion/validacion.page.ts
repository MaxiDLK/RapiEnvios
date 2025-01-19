import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Direccion } from 'src/app/clases/direccion/direccion';
import { UsuarioService } from 'src/app/servicios/usuario-service/usuario.service';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.page.html',
  styleUrls: ['./validacion.page.scss'],
})
export class ValidacionPage implements OnInit {

  validacion:boolean = false;
  form!: FormGroup;
  usuario:any = this.usuarioService.usuario;

  constructor(private fb: FormBuilder, private auth: Auth,private router: Router,private usuarioService:UsuarioService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if(!this.usuario){
      authState(this.auth).subscribe((currentUser) => {
        if (currentUser) {
          const uid = currentUser.uid;
          this.usuarioService.obtenerUsuarioPorId(uid).subscribe(
            (data) => {
              this.usuario = data;
              this.usuarioService.usuario = this.usuario; // Guarda el usuario en el servicio para reutilizarlo
            },
            (error) => {
              console.error('Error al obtener el usuario:', error);
            }
          );
        } else {
          console.log('No hay un usuario autenticado');
        }
      });
    }
    this.form = this.fb.group(
      {
        tipo: ['', [Validators.required]],
        calle: ['', [Validators.required]],
        localidad: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
      }
    );
  }

  async escanearCodigo() {
    try {
      const permiso = await BarcodeScanner.checkPermissions();
      
      if (permiso.camera !== 'granted') {
        const solicitudPermiso = await BarcodeScanner.requestPermissions();
        if (solicitudPermiso.camera !== 'granted') {
          console.error('Permiso de cámara denegado');
          return;
        }
      }
  
      document.querySelector('body')?.classList.add('barcode-scanner-active');
      
      const listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async result => {
          const valores = this.usuarioService.extraerDatos(result.barcode.rawValue);
          if (valores) {
            this.usuario.apellido = valores?.apellido;
            this.usuario.nombre = valores?.nombre;
            this.usuario.dni = valores?.dni;
            this.usuario.fechaNacimiento = valores?.fecha;
            this.validacion = true;
            this.cdr.detectChanges();
          }
          
          document.querySelector('body')?.classList.remove('barcode-scanner-active');
          
          await listener.remove();
          await BarcodeScanner.stopScan();
        }
      );
  
      await BarcodeScanner.startScan();
    } catch (error) {
      console.error('Error en el escaneo:', error);
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
    }
  }

  setMock(){  
    const datoTest = "0000000@Vazquez@Lucio@M@33201001@C@24/08/1993@31/12/2026"; 
    const valores = this.usuarioService.extraerDatos(datoTest);
    if(valores){
      this.usuario.apellido = valores?.apellido;
      this.usuario.nombre = valores?.nombre;
      this.usuario.dni = valores?.dni;
      this.usuario.fechaNacimiento = valores?.fecha;
      this.validacion = true;
    }
  }

  validarUsuario() {
    if (this.form.valid) {
      const {tipo, calle, localidad, provincia } = this.form.value;

      const direccion: Direccion = {
        calle,
        localidad,
        provincia
      };
      
      this.usuario.direccion = direccion;

      this.usuarioService.validarUsuario(
        this.usuario.id, 
        this.usuario.dni,
        this.usuario.nombre,
        this.usuario.apellido,
        this.usuario.fechaNacimiento,
        this.usuario.direccion,
        tipo    
      )
      .then(() => {
        this.usuarioService.usuario = this.usuario;
        console.log('Usuario validado y actualizado');
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log('Error en la validación del usuario:', error);
      });
    }
  }
}

