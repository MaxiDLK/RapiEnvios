import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { AuthService } from 'src/app/servicios/auth-service/auth.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  private route:string = "";

  constructor(private navController:NavController, private auth:AuthService) { }

  ngOnInit() {
    const estado = this.auth.isAuthenticated();
    estado == true ? this.route = 'home' : this.route = 'login'
    setTimeout(()=>{
      this.navController.navigateRoot(this.route);
    },7000)
  }

  ionViewWillEnter() {
    this.showSplash();
  }

  async showSplash() {
    await SplashScreen.show({
      showDuration: 7000, // Mostrar el splash durante 3 segundos
      autoHide: true,
    });
  }

}