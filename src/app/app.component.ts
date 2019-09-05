import { LogueoPage } from './../pages/logueo/logueo';
import { IntroPage } from './../pages/intro/intro';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { MnuPrincipalPage } from './../pages/mnu-principal/mnu-principal';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import firebase, { initializeApp } from "firebase";
import { Storage } from '@ionic/Storage';
import {timer} from 'rxjs/observable/timer'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;
  home = MnuPrincipalPage;
  about = "AboutPage";
  reasons = "VisitReasonsPage";
  login = LogueoPage;
  perfil = "PerfilPage";

  @ViewChild('contenido') menu: NavController

  usuarioEstaConectado = false;

  showSplash = true;


  constructor(public authService:AuthServiceProvider ,public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen, public menuCtrl:MenuController,private translateService: TranslateService, private storage: Storage) {
    
    platform.ready().then(() => {
      this.translateService.setDefaultLang('es');
      this.translateService.use('es');
      splashScreen.hide();
      timer(2000).subscribe(()=>this.showSplash = false)
    });

    firebase.initializeApp({
      apiKey: "AIzaSyDIeTYo5RDPauBhN8-_7phzyXmuCpvh0f0",
      authDomain: "usuariosibarraturismo.firebaseapp.com",
      databaseURL: "https://usuariosibarraturismo.firebaseio.com",
      projectId: "usuariosibarraturismo",
      storageBucket: "",
      messagingSenderId: "279201336611"
    })

    firebase.auth().onAuthStateChanged(
      usuario =>{
        if(usuario != null){
          this.usuarioEstaConectado = true;
          // this.menu.setRoot(this.home);
        }
        else{
          this.usuarioEstaConectado = false;
          // this.menu.setRoot(this.login);
        }
      }
    )
  }

  openPage(pagina){
    this.menu.setRoot(pagina);
    this.menuCtrl.close();
  }

  terminarSesion(){
   this.authService.terminarSesion();
   this.storage.clear();
  }
}

