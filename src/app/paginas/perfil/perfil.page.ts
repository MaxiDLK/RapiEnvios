import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario-service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    if (!this.usuario) {
      console.error('No se encontró información del usuario');
    }
  }
}
