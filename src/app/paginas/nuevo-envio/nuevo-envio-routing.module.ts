import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoEnvioPage } from './nuevo-envio.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoEnvioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoEnvioPageRoutingModule {}
