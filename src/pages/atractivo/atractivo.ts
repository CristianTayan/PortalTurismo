import { CalificarAtractivoPage } from './../calificar-atractivo/calificar-atractivo';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MapaDetallePage } from './../mapa-detalle/mapa-detalle';
import { AtractivosTuristicosServiceProvider } from './../../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HaversineService, GeoCoord  } from 'ng2-haversine';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { RutaAtractivoPage } from '../ruta-atractivo/ruta-atractivo';
import firebase from 'firebase';
import { LogueoPage } from '../logueo/logueo';
import { Storage } from '@ionic/Storage';
import { ImageViewerController } from 'ionic-img-viewer';
import swal from 'sweetalert';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the AtractivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atractivo',
  templateUrl: 'atractivo.html',
  providers:[AtractivosTuristicosServiceProvider]
})
export class AtractivoPage {
  at_id;
  at_video_atractivo;
  at_red_social;
  atractivos;
  comentarios;
  distance;
  menus: string = "Informacion";
  nombre_atractivo =  this.navParams.get('nombre');
  img_atractivo;
  usuarioEstaConectado = false;
  at_contacto;
  image ;
  username;
  nombre;
  nombre_ingles;
  apellido;
  perfil;
  lenguaje;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private atractivosService: AtractivosTuristicosServiceProvider, private iab: InAppBrowser,
              private geolocation: Geolocation,
              private _haversineService: HaversineService,
              private socialSharing: SocialSharing,
              public modalCtrl: ModalController,
              public storage : Storage,
              private callNumber: CallNumber,
              public imageViewerCtrl: ImageViewerController) {
    this.at_id = navParams.get('id');
    this.Atractivo();

    this.img_atractivo = this.navParams.get('img');
    this.nombre_atractivo = this.navParams.get('nombre');
    this.nombre_ingles = this.navParams.get('nombre_ingles');

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

  ionViewDidLoad(){
    this.lenguaje = localStorage.getItem('idioma');
    console.log(this.lenguaje);
    this.at_contacto = this.navParams.get('contacto');
    this.at_video_atractivo = this.navParams.get('web');
    this.calcularDistancia();
    this.imagenesAtractivo();
    this.getValue();
  }

  ionViewDidEnter() {
    this.imagenesAtractivo();
  }

  onClick(imageToView) {
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }

  getValue(){
    this.storage.get("object").then((data)=>{
      this.perfil = [data];
      this.username = data.username;
      this.image = data.image;
      this.nombre= data.nombre;
      this.apellido = data.apellido;
      console.log(this.perfil);
    })
  }

  Atractivo(){
    this.atractivosService.getAtractivo(this.at_id)
    .then(
      data => {
        this.atractivos = data;
        for(let item of this.atractivos){
          this.at_red_social = item.at_red_social;
        }
      });
  }

  openLinkFb(){
    this.iab.create(this.at_red_social,'_system', 'location=yes');
  }
  openLink(){
    this.iab.create(this.at_video_atractivo,'_system', 'location=yes');
  }

  imagenesAtractivo(){
    this.atractivosService.getImagenesAtractivo(this.at_id)
    .then(
      data => {
        this.comentarios = data;
        console.log(this.comentarios);

      }
    )
  }

  nofile(){
    swal("Lo sentimos!", "no hemos encontrado datos para este lugar", "error");
  }

  callJoint() {
    try {
    this.callNumber.callNumber(this.at_contacto, true);
    } catch (error) {
      swal("Lo sentimos!", "no hemos encontrado número", "error");
    }
  }

  pasarCoordenadas(at_longitud, at_latitud, at_nombre){
    this.navCtrl.push(MapaDetallePage,{
      latitud:at_latitud,
      longitud:at_longitud,
      nombre: at_nombre
    })
  }

  pasarCoordenadasRuta(at_latitud, at_longitud, at_nombre){
    this.navCtrl.push(RutaAtractivoPage,{
      latitud:at_latitud,
      longitud:at_longitud,
      nombre: at_nombre
    })
  }

  calcularDistancia() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let miUbicacion: GeoCoord = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
    };
    let destino: GeoCoord = {
      latitude: this.navParams.get('latitud'),
      longitude: this.navParams.get('longitud')
  };
    // let meters = this._haversineService.getDistanceInMeters(miUbicacion, destino);
    let kilometers = this._haversineService.getDistanceInKilometers(miUbicacion, destino);
    // let miles = this._haversineService.getDistanceInMiles(miUbicacion, destino);
    this.distance = Math.round(kilometers * 100) / 100
   });
  }

  compartir(){
    let lat = this.navParams.get('latitud');
    let lng = this.navParams.get('longitud');
    let image = this.navParams.get('img')
    let urlimage = "http://sigm.ibarra.gob.ec/sigm8/_lib/file/imgportalturistico/atractivos/"+image;
    let message = "Hola..¡¡ Estoy en "+ this.nombre_atractivo+ " te envío la ubicación";
    let url = "http://www.google.com/maps/@"+lat+","+lng+",17z?hl=es"
    console.log(message,image, url);
    this.socialSharing.shareViaWhatsApp(message,urlimage, url);
  }

  iniciarSesion(){
      this.navCtrl.push(LogueoPage)
    }

  calificarAtractivo(at_id, at_nombre){
    this.navCtrl.push(CalificarAtractivoPage,{
      id : at_id,
      nombre:at_nombre
    })
  }

}
