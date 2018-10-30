import { AtractivosTuristicosPageModule } from './../pages/atractivos-turisticos/atractivos-turisticos.module';
import { MnuPrincipalPageModule } from './../pages/mnu-principal/mnu-principal.module';
import { AtractivoDetallePage } from './../pages/atractivo-detalle/atractivo-detalle';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuServiceProvider } from '../providers/menu-service/menu-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaAtractivoServiceProvider } from '../providers/categoria-atractivo-service/categoria-atractivo-service';
import { AtractivosTuristicosServiceProvider } from '../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { MnuCategoriaAtractivosPageModule } from '../pages/mnu-categoria-atractivos/mnu-categoria-atractivos.module';
// import { AtractivosTuristicosPage } from '../pages/atractivos-turisticos/atractivos-turisticos';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AtractivoDetallePage


  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    MnuCategoriaAtractivosPageModule,
    MnuPrincipalPageModule,
    AtractivosTuristicosPageModule
  

  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // AtractivosTuristicosPage,
    AtractivoDetallePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuServiceProvider,
    CategoriaAtractivoServiceProvider,
    AtractivosTuristicosServiceProvider
  ]
})
export class AppModule {}
