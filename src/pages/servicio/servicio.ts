import { LogueoPage } from './../logueo/logueo';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { RutaServicioPage } from './../ruta-servicio/ruta-servicio';
import { CalificarServicioPage } from './../calificar-servicio/calificar-servicio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiciosTuristicosServiceProvider } from '../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EditComentPage } from '../edit-coment/edit-coment';
import { Storage } from '@ionic/Storage';
import firebase from "firebase";
import swal from 'sweetalert';
import { ImageViewerController } from 'ionic-img-viewer';

@IonicPage()
@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html',
})
export class ServicioPage {
  st_id;
  st_pagina_web = this.navParams.get('web');;
  st_celular = this.navParams.get('celular');
  servicios;
  menus: string = "Informacion";
  distancia;
  img_servicio
  nombre_servicio;
  comentarios;
  simg_id;
  numComentarios;
  st_red_social = this.navParams.get('redsocial');
  st_video_servicio = this.navParams.get('video');
  image;
  username;
  nombre;
  apellido;
  perfil;
  imgs;

  usuarioEstaConectado = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    private geolocation: Geolocation,
    public servicioService: ServiciosTuristicosServiceProvider,
    private _haversineService: HaversineService,
    private socialSharing: SocialSharing,
    private callNumber: CallNumber,
    private toast: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public imageViewerCtrl: ImageViewerController,
    public authService: AuthServiceProvider) {

    this.img_servicio = this.navParams.get('img');
    console.log(this.img_servicio);

    this.nombre_servicio = this.navParams.get('nombre');

    this.loadData();


  }

  ionViewDidLoad() {
    this.imgs = "http://sigm.ibarra.gob.ec/sigm8/_lib/file/imgportalturistico/servicios/" + this.img_servicio;
    this.st_pagina_web = this.navParams.get('web');
    this.calcularDistancia();
    this.servicio();
    this.getComentById();
    this.numeroComentarios();
    this.getValue();

    firebase.auth().onAuthStateChanged(
      usuario => {
        if (usuario != null) {
          this.usuarioEstaConectado = true;
          // this.menu.setRoot(this.home);
        }
        else {
          this.usuarioEstaConectado = false;
          // this.menu.setRoot(this.login);
        }
      }
    )
  }

  ionViewDidEnter() {
    this.getComentById();
  }

  getValue() {
    this.storage.get("object").then((data) => {
      this.perfil = [data];
      this.username = data.username;
      this.image = data.image;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      console.log(this.perfil);
    })
  }

  nofile() {
    swal("Lo sentimos!", "no hemos encontrado datos para este lugar", "error");
  }

  servicio() {
    this.st_id = this.navParams.get('id');
    this.servicioService.getServicio(this.st_id)
      .then(
        data => {
          this.servicios = data;
        }
      )
  }

  iniciarSesion() {
    this.navCtrl.push(LogueoPage)
  }

  loadData() {
    this.st_id = this.navParams.get('id');
    this.servicioService.getServicio(this.st_id)
      .then(
        data => {
          this.servicios = data;
        }
      )
  }

  openLink() {
    this.iab.create(this.st_pagina_web, "_blank");
  }

  openLinkFb() {
    this.iab.create(this.st_red_social, "_blank");
  }

  openLinkYt() {
    this.iab.create(this.st_video_servicio, "_blank");
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
      this.distancia = Math.round(kilometers * 100) / 100
    });
  }

  goCalificarServicio(st_id, st_nombre) {
    this.navCtrl.push(CalificarServicioPage, {
      id: st_id,
      nombre: st_nombre
    });
  }

  onClick(imageToView) {
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }

  compartir() {
    let lat = this.navParams.get('latitud');
    let lng = this.navParams.get('longitud');
    let image = this.navParams.get('img')
    let urlimage = "http://sigm.ibarra.gob.ec/sigm8/_lib/file/imgportalturistico/servicios/" + image;
    let message = "Hola..¡¡ Estoy en " + this.nombre_servicio + " te envío la ubicación";
    let url = "http://www.google.com/maps/@" + lat + "," + lng + ",17z?hl=es"
    console.log(message, urlimage, url);
    this.socialSharing.shareViaWhatsApp(message, urlimage, url);
  }

  pasarCoordenadasRuta(st_latitud, st_longitud, st_nombre) {
    this.navCtrl.push(RutaServicioPage, {
      latitud: st_latitud,
      longitud: st_longitud,
      nombre: st_nombre
    })
  }

  numeroComentarios() {
    this.st_id = this.navParams.get('id');
    this.servicioService.getComentById(this.st_id)
      .then(
        data => {
          this.numComentarios = Object.keys(data).length;
          console.log(this.numComentarios);

        }
      )
  }

  getComentById() {
    this.st_id = this.navParams.get('id');
    this.servicioService.getComentById(this.st_id)
      .then(
        data => {
          this.comentarios = data;
        }
      )
  }

  ErrorToast() {
    const toast = this.toast.create({
      message: 'Error no existe número',
      duration: 3000
    });
    toast.present();
  }

  callJoint() {
    try {
      this.callNumber.callNumber(this.st_celular, true);
    } catch (error) {
      this.ErrorToast();
    }
  }

  deleteComment(simg_id, simg_descripcion, sigm_fecha, simg_ruta) {
    let modal = this.modalCtrl.create(
      EditComentPage, {
      id: simg_id,
      descripcion: simg_descripcion,
      fecha: sigm_fecha,
      ruta: simg_ruta
    }
    )
    modal.present();
    modal.onDidDismiss(() => {
      // this.navCtrl.pop();

    });
    this.loadData();
  }

  showPrompt() {
    var __this = this;
    let prompt = this.alertCtrl.create(
      {
        title: "Aviso",
        message: "Seguro que quieres borrar tu comentario",
        buttons: [
          {
            text: "Cancelar",
            handler: data => {
            }
          },
          {
            text: "Borrar",
            handler: data => {
              __this.borrar();
            }
          }
        ]
      }
    );

    prompt.present();
  }

  borrar() {
    this.servicioService.deleteComent(this.simg_id)
      .then(
        data => {
          console.log(data[0]);
          // this.loadData();
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
  }
}
