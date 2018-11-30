import { MapaServiciosComponent } from './../components/mapa-servicios/mapa-servicios';
import { RestaurantesPage } from './../pages/restaurantes/restaurantes';
import { BuscarServicioPage } from './../pages/buscar-servicio/buscar-servicio';
import { MapHotelComponent } from './../components/map-hotel/map-hotel';
import { ServicioPage } from './../pages/servicio/servicio';
import { ListaServiciosPage } from './../pages/lista-servicios/lista-servicios';
import { StarRatingModule } from 'ionic3-star-rating';
import { AtractivoPage } from './../pages/atractivo/atractivo';
import { MapaDetallePage } from './../pages/mapa-detalle/mapa-detalle';
import { ConfiguracionPage } from './../pages/configuracion/configuracion';
import { MnuCategoriaAtractivosPage } from './../pages/mnu-categoria-atractivos/mnu-categoria-atractivos';
import { MapaPage } from './../pages/mapa/mapa';
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
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaAtractivoServiceProvider } from '../providers/categoria-atractivo-service/categoria-atractivo-service';
import { AtractivosTuristicosServiceProvider } from '../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ServiciosTuristicosServiceProvider } from '../providers/servicios-turisticos-service/servicios-turisticos-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HaversineService } from "ng2-haversine";
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import {ParallaxDirective} from 'ionic-header-parallax'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AtractivoDetallePage,
    MapaPage,
    MnuCategoriaAtractivosPage,
    ConfiguracionPage,
    MapaDetallePage,
    AtractivoPage,
    ServicioPage,
    MapHotelComponent,
    ListaServiciosPage,
    BuscarServicioPage,
    SearchPipe,
    SortPipe,
    RestaurantesPage,
    MapaServiciosComponent,
    ParallaxDirective



  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    MnuPrincipalPageModule,
    AtractivosTuristicosPageModule,
    StarRatingModule,
    Ionic2RatingModule,
    BrowserModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AtractivoDetallePage,
    MnuCategoriaAtractivosPage,
    MapaPage,
    ConfiguracionPage,
    MapaDetallePage,
    AtractivoPage,
    ServicioPage,
    ListaServiciosPage,
    BuscarServicioPage,
    RestaurantesPage

  ],
  providers: [
    HaversineService,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaAtractivoServiceProvider,
    AtractivosTuristicosServiceProvider,
    ServiciosTuristicosServiceProvider,
    
    
  ]
})
export class AppModule {}
