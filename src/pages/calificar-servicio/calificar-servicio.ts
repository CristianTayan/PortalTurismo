import { MnuPrincipalPage } from './../mnu-principal/mnu-principal';
import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/Storage';
import swal from 'sweetalert';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the CalificarServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calificar-servicio',
  templateUrl: 'calificar-servicio.html',
})
export class CalificarServicioPage {
  data = {}
  st_nombre = this.navParams.get('nombre');
  st_id = this.navParams.get('id');
  sigm_rating;
  simg_descripcion;
  simg_ruta;
  image;
  username;
  nombre;
  apellido;
  perfil;
  imguser;

  // commentForm: FormGroup;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    // public formBuilder: FormBuilder,
    private servicios: ServiciosTuristicosServiceProvider,
    public alertCtrl: AlertController,
    private camera: Camera,
    private storage: Storage) {
                  
  }

  ionViewDidLoad() {
    this.getValue();
    console.log(this.st_nombre);
    ;
    
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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Gracias por tu opinón',
      subTitle: 'Tu opinion aparecera en el historial',
      buttons: ['OK']
    });
    alert.present();
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
    datos["simg_base64"] = this.image;
    datos["simg_descripcion"] =this.simg_descripcion;
    datos["st_id"] = this.st_id;
    // datos["sigm_rating"] = this.sigm_rating;
    datos["st_fecha"] =  now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()+ " "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    datos["username"] = this.username;
    datos["user_image"] = this.imguser;
    
    this.servicios.addComentario(datos)
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
