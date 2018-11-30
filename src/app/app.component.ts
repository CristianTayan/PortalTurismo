import { MnuPrincipalPage } from './../pages/mnu-principal/mnu-principal';
import { MnuCategoriaAtractivosPage } from './../pages/mnu-categoria-atractivos/mnu-categoria-atractivos';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { MapaPage } from '../pages/mapa/mapa';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('contenido') menu: NavController
  rootPage:any = MnuPrincipalPage;
  home = MnuPrincipalPage;
  cat = MnuCategoriaAtractivosPage;
  map = MapaPage;
  opt = ConfiguracionPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(pagina : any){
    this.menu.setRoot(pagina);
    this.menuCtrl.close();
  }
}

