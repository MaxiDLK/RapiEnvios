import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./paginas/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./paginas/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'validacion',
    loadChildren: () => import('./paginas/validacion/validacion.module').then( m => m.ValidacionPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./paginas/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'nuevo-envio',
    loadChildren: () => import('./paginas/nuevo-envio/nuevo-envio.module').then( m => m.NuevoEnvioPageModule)
  },
  {
    path: 'detalle-pedido/:id',
    loadChildren: () => import('./paginas/detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
