import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { InicioTransportistaComponent } from './inicio-transportista/inicio-transportista.component';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { Router } from '@angular/router';


@NgModule({
  declarations: [InicioTransportistaComponent,InicioUsuarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [InicioTransportistaComponent,InicioUsuarioComponent],

})
export class ComponentesPageModule {}
