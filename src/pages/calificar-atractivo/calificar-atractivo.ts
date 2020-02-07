import { MnuPrincipalPage } from './../mnu-principal/mnu-principal';
import { AtractivosTuristicosServiceProvider } from './../../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/Storage';
import swal from 'sweetalert';

/**
 * Generated class for the CalificarAtractivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calificar-atractivo',
  templateUrl: 'calificar-atractivo.html',
})
export class CalificarAtractivoPage {
  at_nombre = this.navParams.get('nombre');
  at_id = this.navParams.get('id');
  igm_rating;
  img_descripcion;
  img_ruta;
  image;
  username;
  nombre;
  apellido;
  perfil;
  imguser;
  idioma = localStorage.getItem('idioma');

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public storage:Storage, public atractivo: AtractivosTuristicosServiceProvider) {
  }

  ionViewDidLoad() {
    this.getValue();
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 50
    }
    this.camera.getPicture( options )
    .then(imageData => {
      // this.image = 'data:image/jpeg;base64,${imageData}';
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);


    })
    .catch(error =>{
      console.error( error );
    });
  }

  getPictureGallery(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 50
    }
    this.camera.getPicture( options )
    .then(imageData => {
      // this.image = 'data:image/jpeg;base64,${imageData}';
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);


    })
    .catch(error =>{
      console.error( error );
    });
  }

  getValue(){
    this.storage.get("object").then((data)=>{
      this.perfil = [data];
      this.username = data.username;
      this.imguser = data.image;
      this.nombre= data.nombre;
      this.apellido = data.apellido;
      console.log(this.perfil);
    })
  }

  calificar(){
    var now = new Date();
    var datos={};
    datos["img_base64"] = this.image;
    datos["img_descripcion"] =this.img_descripcion;
    datos["at_id"] = this.at_id;
    // datos["sigm_rating"] = this.sigm_rating;
    datos["img_fecha"] =  now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()+ " "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    datos["username"] = this.username;
    datos["user_image"] = this.imguser;

    this.atractivo.addComentario(datos)
    .then(
      data =>{
        swal("Gracias!", "por tu opinion!", "success");
        this.navCtrl.pop();
      }
    ).catch(
      error => {
        console.log(error);

      }
    )
  }
}
