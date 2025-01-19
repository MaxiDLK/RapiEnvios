import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Envio } from 'src/app/clases/envio/envio';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { EnvioService } from 'src/app/servicios/envio-service/envio.service';
import { UsuarioService } from 'src/app/servicios/usuario-service/usuario.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  qrData: string = ''; 
  qrCodeBase64: string = '';   
  envio?:Envio;        
  usuario?:Usuario = this.usuarioService.usuario;
  opcionEstado: string = '';

  @ViewChild('qrcodeElement', { static: false }) qrcodeElement!: ElementRef;

  constructor(private envioService:EnvioService, private route:ActivatedRoute, private auth: Auth, private usuarioService: UsuarioService,private navController: NavController){
    
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.qrData = id.toString();
      this.envioService.obtenerEnvioPorId(id).subscribe(
        (data) => {
          this.envio = data;
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
    if(!this.usuario){
      authState(this.auth).subscribe((currentUser) => {
        if (currentUser) {
          const uid = currentUser.uid;
          this.usuarioService.obtenerUsuarioPorId(uid).subscribe(
            (data) => {
              this.usuarioService.usuario = this.usuario = data || null;
            },
            (error) => {
              console.error('Error al obtener el usuario:', error);
            }
          );
        }
      })
    }

  }

  convertirQrToBase64() {
    if(this.usuario){
    const qrImg = this.qrcodeElement.nativeElement.querySelector('img') as HTMLImageElement;
    this.qrCodeBase64 = qrImg.src;
    this.envioService.aceptarEnvio(this.qrData,this.usuario?.dni?.toString() || '',this.qrCodeBase64);
    this.navController.navigateForward('/home');
    }
  }


  async escanearQR() {
    try {
      // Solicita permisos de cámara
      await BarcodeScanner.requestPermissions();

      // Inicia el escaneo
      const result = await BarcodeScanner.scan();
      if (result.barcodes && result.barcodes.length > 0) {
        const scannedData = result.barcodes[0].displayValue;

        // Verifica que el código escaneado coincida con el QR generado
        if (scannedData === this.qrData) {
          if (this.envio) {
            this.envioService.entregarEnvio(this.envio.id,this.envio.receptor)
            alert('Estado cambiado con éxito!');
          } else {
            alert('Error: No se puede cambiar el estado.');
          }
        } else {
          alert('El QR escaneado no coincide.');
        }
      } else {
        alert('No se detectó un código QR.');
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
      alert('Error al escanear QR.');
    }
  }

  cambiarEstado(){

    if (!this.opcionEstado) {
      console.log('Por favor, selecciona un estado antes de cambiar.');
      alert('Error: Por favor, selecciona un estado antes de cambiar.');
      return;
  }

  switch (this.opcionEstado) {
    case 'viajando':
      this.envioService.viajandoEnvio(this.envio?.id!,this.envio?.receptor)
        .then(() => {
          this.envio!.estado = 'viajando';
          console.log('El estado se cambió a "En viaje".');
          this.navController.navigateForward('/home');
        })
        .catch((error) => console.error('Error al cambiar a "En viaje":', error));
      break;

    case 'entregado':
      this.envioService.entregarEnvio(this.envio?.id!,this.envio?.receptor)
        .then(() => {
          this.envio!.estado = 'entregado';
          console.log('El estado se cambió a "Entregado".');
          this.navController.navigateForward('/home');
        })
        .catch((error) => console.error('Error al cambiar a "Entregado":', error));
      break;

    default:
      console.log('Estado no reconocido:', this.opcionEstado);

  }
}

}