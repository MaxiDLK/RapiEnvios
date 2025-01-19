import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidacionPageRoutingModule } from './validacion-routing.module';

import { ValidacionPage } from './validacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ValidacionPageRoutingModule
  ],
  declarations: [ValidacionPage]
})
export class ValidacionPageModule {}
