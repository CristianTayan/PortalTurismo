import { CalificarAtractivoPage } from './../pages/calificar-atractivo/calificar-atractivo';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { ServiciosCategoriaPage } from './../pages/servicios-categoria/servicios-categoria';
import { MnuCategoriaServiciosPage } from './../pages/mnu-categoria-servicios/mnu-categoria-servicios';
import { IntinerarioPage } from './../pages/intinerario/intinerario';
import { VidaNocturnaPage } from './../pages/vida-nocturna/vida-nocturna';
import { RutaServicioPage } from './../pages/ruta-servicio/ruta-servicio';
import { RutaAtractivoPage } from './../pages/ruta-atractivo/ruta-atractivo';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MapaServiciosComponent } from './../components/mapa-servicios/mapa-servicios';
import { RestaurantesPage } from './../pages/restaurantes/restaurantes';
import { BuscarServicioPage } from './../pages/buscar-servicio/buscar-servicio';
import { MapHotelComponent } from './../components/map-hotel/map-hotel';
import { ServicioPage } from './../pages/servicio/servicio';
import { StarRatingModule } from 'ionic3-star-rating';
import { AtractivoPage } from './../pages/atractivo/atractivo';
import { MapaDetallePage } from './../pages/mapa-detalle/mapa-detalle';
// import { ConfiguracionPage } from './../pages/configuracion/configuracion';
import { MnuCategoriaAtractivosPage } from './../pages/mnu-categoria-atractivos/mnu-categoria-atractivos';
import { MapaPage } from './../pages/mapa/mapa';
// import { AtractivoDetallePage } from './../pages/atractivo-detalle/atractivo-detalle';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { CategoriaAtractivoServiceProvider } from '../providers/categoria-atractivo-service/categoria-atractivo-service';
import { AtractivosTuristicosServiceProvider } from '../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ServiciosTuristicosServiceProvider } from '../providers/servicios-turisticos-service/servicios-turisticos-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HaversineService } from "ng2-haversine";
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { CalificarServicioPage } from '../pages/calificar-servicio/calificar-servicio';
import { GoogleMaps } from '@ionic-native/google-maps';
import { RutasPage } from '../pages/rutas/rutas';
import { RutaIntinerarioPage } from '../pages/ruta-intinerario/ruta-intinerario';
import { CallNumber } from '@ionic-native/call-number';
import { AndroidFullScreen } from'@ionic-native/android-full-screen'
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Base64 } from '@ionic-native/base64';
import { EditComentPage } from '../pages/edit-coment/edit-coment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import {IonicStorageModule} from '@ionic/Storage';
import { DataProvider } from '../providers/data/data';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { AtractivosTuristicosPage } from '../pages/atractivos-turisticos/atractivos-turisticos';
import { IntroPage } from '../pages/intro/intro';
import { MnuPrincipalPage } from '../pages/mnu-principal/mnu-principal';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { LogueoPage } from '../pages/logueo/logueo';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // AtractivoDetallePage,
    MapaPage,
    MnuCategoriaAtractivosPage,
    // ConfiguracionPage,
    MapaDetallePage,
    AtractivoPage,
    ServicioPage,
    MapHotelComponent,
    // ListaServiciosPage,
    BuscarServicioPage,
    SearchPipe,
    SortPipe,
    RestaurantesPage,
    MapaServiciosComponent,
    CalificarServicioPage,
    RutaAtractivoPage,
    RutaServicioPage,
    VidaNocturnaPage,
    RutasPage,
    IntroPage,
    MnuPrincipalPage,
    IntinerarioPage,
    RutaIntinerarioPage,
    EditComentPage,
    MnuCategoriaServiciosPage,
    ServiciosCategoriaPage,
    LogueoPage,
    ResetPasswordPage,
    CalificarAtractivoPage,
    AtractivosTuristicosPage
    

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
  }),
    // MnuPrincipalPageModule,
    // AtractivosTuristicosPageModule,
    StarRatingModule,
    Ionic2RatingModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicImageViewerModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // AtractivoDetallePage,
    MnuCategoriaAtractivosPage,
    MapaPage,
    // ConfiguracionPage,
    MapaDetallePage,
    AtractivoPage,
    ServicioPage,
    // ListaServiciosPage,
    BuscarServicioPage,
    RestaurantesPage,
    CalificarServicioPage,
    RutaAtractivoPage,
    RutaServicioPage,
    VidaNocturnaPage,
    RutasPage,
    IntroPage,
    // AboutPage,
    // VisitReasonsPage,
    IntinerarioPage,
    RutaIntinerarioPage,
    EditComentPage,
    MnuCategoriaServiciosPage,
    ServiciosCategoriaPage,
    MnuPrincipalPage,
    LogueoPage,
    // PerfilPage,
    ResetPasswordPage,
    CalificarAtractivoPage,
    AtractivosTuristicosPage

  ],
  providers: [
    HaversineService,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaAtractivoServiceProvider,
    AtractivosTuristicosServiceProvider,
    ServiciosTuristicosServiceProvider,
    SocialSharing,
    GoogleMaps,
    CallNumber,
    AndroidFullScreen,
    AuthServiceProvider,
    Base64,
    Network,
    UserServiceProvider,
    DataProvider
    // AuthServiceProvider
  
    
  ]
})
export class AppModule {}
