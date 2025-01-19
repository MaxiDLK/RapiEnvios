import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoEnvioPageRoutingModule } from './nuevo-envio-routing.module';

import { NuevoEnvioPage } from './nuevo-envio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevoEnvioPageRoutingModule
  ],
  declarations: [NuevoEnvioPage]
})
export class NuevoEnvioPageModule {}
