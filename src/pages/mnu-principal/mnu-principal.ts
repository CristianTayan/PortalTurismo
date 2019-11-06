import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from './../../models/perfil';
import { MnuCategoriaServiciosPage } from './../mnu-categoria-servicios/mnu-categoria-servicios';
import { IntinerarioPage } from './../intinerario/intinerario';
import { VidaNocturnaPage } from './../vida-nocturna/vida-nocturna';
import { RestaurantesPage } from './../restaurantes/restaurantes';
import { BuscarServicioPage } from './../buscar-servicio/buscar-servicio';
import { ServicioPage } from './../servicio/servicio';
import { AtractivoPage } from './../atractivo/atractivo';
import { AtractivosTuristicosServiceProvider } from './../../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MnuCategoriaAtractivosPage } from '../mnu-categoria-atractivos/mnu-categoria-atractivos';
import { ServiciosTuristicosServiceProvider } from '../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { RutasPage } from '../rutas/rutas';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { DataProvider } from '../../providers/data/data';


/**
 * Generated class for the MnuPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mnu-principal',
  templateUrl: 'mnu-principal.html',
  providers:[AtractivosTuristicosServiceProvider]
})

export class MnuPrincipalPage {
  perfilData: AngularFireObject<Perfil>
  public isTextOpened = false;
  public isSearchbarOpened = false;
  menus;
  atractivos;
  numAtractivos;
  hoteles;
  numHoteles;
  hostales;
  numHostales;
  restaurantes;
  numRestaurantes;
  bares;
  numBares;
  distancia;
  rutas;
  usuarios;
  sliderImages;

  perfilList: Observable<any[]>;
  slidesPerView : number = 1;

  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, private atractivosService: AtractivosTuristicosServiceProvider,
              public servicioService: ServiciosTuristicosServiceProvider, private androidFullScreen: AndroidFullScreen, private translateService: TranslateService,
              private toast: ToastController, private network: Network,public fbDatabase: AngularFireDatabase,public afAuth: AngularFireAuth, public platform : Platform,
              private loadingCtrl: LoadingController, private slider: DataProvider) {
    this.atractivosService.getAtractivos()
    .then(
     data => {
       this.atractivos = data;
     });

     firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let fireBaseUser = firebase.auth().currentUser.email;
      } else {
        // No user is signed in.
      }
    });


  }

  ionViewDidLoad(){
    this.numeroAtractivos();
    this.getHoteles();
    this.numeroHoteles();
    this.getHostales();
    this.numeroHostales();
    this.getRestaurantes();
    this.numeroRestaurantes();
    this.getVidaNocturna();
    this.numeroBares();
    this.getRutas();
    // this.presentLoadingDefault();
    this.getSliderData();


  }

  getSliderData(){
    this.slider.getSiderData()
    .then(data =>{
      this.sliderImages = data;
    })
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }


  cambioIdioma(selectedValue){
    this.translateService.use(selectedValue);
  }

  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      this.displayNetworkError(data.type);
    }, error => console.error(error));
  }

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `Ahora estas ${connectionState} via ${networkType}`,
      duration: 3000
    }).present();
  }

  displayNetworkError(connectionState: string){
    this.toast.create({
      message: `Ahora estas ${connectionState}`,
      duration: 3000
    }).present();
  }

  numeroAtractivos(){
    this.atractivosService.getAtractivos()
    .then(
     data => {
      this.numAtractivos = Object.keys(data).length
     });
  }

  AbrirAtractivos(at_id){
    this.navCtrl.push(AtractivoPage,{
       id : at_id
    });
  }

  AbrirAtractivo(at_id, at_nombre, at_video_atractivo, at_latitud, at_longitud, at_img_atractivo, at_contacto, at_red_social){
    this.navCtrl.push(AtractivoPage,{
       id : at_id,
       nombre : at_nombre,
       web: at_video_atractivo,
       latitud: at_latitud,
       longitud: at_longitud,
       img: at_img_atractivo,
       contacto: at_contacto,
       redsocial: at_red_social
    });
  }

  abrirCategorias(){
    this.navCtrl.push(MnuCategoriaAtractivosPage)
  }

  abrirCategoriaServicios(){
    this.navCtrl.push(MnuCategoriaServiciosPage)
  }

  onSearch(event){
    console.log(event.target.value);

  }
  buscarServicios(){
    this.navCtrl.push(BuscarServicioPage);
  }

  getHoteles(){
    this.servicioService.getHoteles()
    .subscribe(
      data => {
        this.hoteles = data;
        console.log(this.hoteles);
      }
    )
  }

  numeroHoteles(){
    this.servicioService.getHoteles()
    .subscribe(
      data => {
        this.numHoteles = Object.keys(data).length;
      }
    )
  }

  getHostales(){
    this.servicioService.getHostales()
    .subscribe(
      data => {
        this.hostales = data;
        console.log(this.hostales);
      }
    )
  }

  numeroHostales(){
    this.servicioService.getHostales()
    .subscribe(
      data => {
        this.numHostales = Object.keys(data).length;
      }
    )
  }

  getRestaurantes(){
    this.servicioService.getRestaurantes()
    .subscribe(
      data => {
        this.restaurantes = data;
      }
    )
  }


  numeroRestaurantes(){
    this.servicioService.getRestaurantes()
    .subscribe(
      data => {
        this.numRestaurantes = Object.keys(data).length;
      }
    )
  }

  getVidaNocturna(){
    this.servicioService.getVidaNocturna()
    .subscribe(
      data => {
        this.bares = data;
      }
    )
  }

  numeroBares(){
    this.servicioService.getVidaNocturna()
    .subscribe(
      data => {
        this.numBares = Object.keys(data).length;
      }
    )
  }

  AbrirServicio(st_id, st_nombre, st_pagina_web, st_latitud, st_longitud, st_celular,st_red_social, st_video_servicio, st_img_servicio){
    this.navCtrl.push(ServicioPage,{
       id : st_id,
       nombre : st_nombre,
       web: st_pagina_web,
       latitud: st_latitud,
       longitud: st_longitud,
       celular: st_celular,
       redsocial : st_red_social,
       video : st_video_servicio,
       img: st_img_servicio
    });
  }

  getRutas(){
    this.servicioService.getRutas()
    .subscribe(
      data => {
        this.rutas = data;
      }
    )
  }

  abrirRestaurantesPage(){
    this.navCtrl.push(RestaurantesPage);
  }

  goToVidaNocturna(){
    this.navCtrl.push(VidaNocturnaPage);
  }

  goToRutas(){
    this.navCtrl.push(RutasPage);
  }

  verIntinerario(rt_id){
    this.navCtrl.push(IntinerarioPage,{
      id : rt_id
    })
  }
}
