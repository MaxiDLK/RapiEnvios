import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';
import { HistorialUsuarioComponent } from '../../componentes/historial-usuario/historial-usuario.component';
import {HistorialTransportistaComponent} from '../../componentes/historial-transportista/historial-transportista.component';


import { HistorialPage } from './historial.page';
import { ComponentesPageModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesPageModule,
    HistorialPageRoutingModule
  ],
  declarations: [HistorialPage,HistorialUsuarioComponent,HistorialTransportistaComponent]
})
export class HistorialPageModule {}
