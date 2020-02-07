import { ImageViewerController } from 'ionic-img-viewer';
import { GeoCoord } from 'ng2-haversine';
import { HaversineService } from 'ng2-haversine';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import swal from 'sweetalert';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the EmprendimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emprendimiento',
  templateUrl: 'emprendimiento.html',
})
export class EmprendimientoPage {
  em_id = this.navParams.get('id');
  emprendimiento;
  url;
  celular;
  latitud = this.navParams.get('latitud');
  longitud = this.navParams.get('latitud');
  nombre;
  em_img_servicio;
  menus: string = "Informacion";
  distancia;
  idioma = localStorage.getItem('idioma');

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider,
    private _haversineService: HaversineService,
    private socialSharing: SocialSharing,
    private callNumber: CallNumber,
    private geolocation: Geolocation,
    private toast: ToastController,
    private iab: InAppBrowser,
    public imageViewerCtrl: ImageViewerController) {

  }
  nofile() {
    swal("Lo sentimos!", "no hemos encontrado datos para este lugar", "error");
  }

  onClick(imageToView) {
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }
  callJoint() {
    try {
      this.callNumber.callNumber(this.celular, true);
    } catch (error) {
      console.log(error);
      ;
    }
  }

  ionViewDidLoad() {
    this.getEmprendimiento();
    this.calcularDistancia();
  }
  compartir() {
    let lat = this.latitud;
    let lng = this.longitud;
    let image = this.navParams.get('img')
    let urlimage = "http://sigm.ibarra.gob.ec/sigm8/_lib/file/imgportalturistico/emprendimientos/" + this.em_img_servicio;
    let message = "Hola..¡¡ Estoy en " + this.nombre + " te envío la ubicación";
    let url = "http://www.google.com/maps/@" + lat + "," + lng + ",17z?hl=es"
    console.log(message, urlimage, url);
    this.socialSharing.shareViaWhatsApp(message, urlimage, url);
  }

  getEmprendimiento(){
    this.dataService.getEmprendimiento(this.em_id)
    .then(data => {
      this.emprendimiento = data;
      console.log(this.emprendimiento);
      ;
      for (let item of this.emprendimiento) {
        this.nombre = item.em_emprendimiento;
        this.em_img_servicio = item.em_img_servicio;
        this.celular = item.em_telefono;
      }
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
      this.distancia = Math.round(kilometers * 100) / 100
    });
  }

}
