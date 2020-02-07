import { UserServiceProvider } from './../../providers/user-service/user-service';
import { MnuPrincipalPage } from './../mnu-principal/mnu-principal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database'
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/Storage';
import firebase from 'firebase'
import swal from 'sweetalert';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  image ;
  username;
  nombre;
  apellido;
  key:string ='datos';
  perfil;
  registerForm: FormGroup;
  idioma = localStorage.getItem('idioma');

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase, public camera: Camera, public formBuilder: FormBuilder, private storage: Storage,
    public userService: UserServiceProvider) {

  this.registerForm = this.formBuilder.group({
    nombre:[null, [Validators.required, Validators.minLength(5)]],
    apellido:[null, [Validators.required, Validators.minLength(1)]],
    username:[null, [Validators.required, Validators.minLength(1)]],
  }) 
  }

  ionViewDidLoad() {
    this.getValue();
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
      this.image = 'data:image/jpeg;base64,' + imageData;
    })
    .catch(error =>{
      console.error( error );
    });
  }

  crearPerfil(){
    var perfil={};
    perfil["image"] = this.image;
    perfil["nombre"] =this.nombre;
    perfil["apellido"] = this.apellido;
    perfil["username"] = this.username;
    this.afAuth.authState.take(1).subscribe(auth =>{
      this.afDatabase.object(`perfil/${auth.uid}`).set(perfil)
      .then(()=>{
        this.storage.set("object", perfil).then((successData)=>{
          swal({
            title: "Perfecto!",
            text: "Bienvenido "+ this.nombre,
            timer: 5000,
            icon: 'success'
            });          
        })
        this.navCtrl.setRoot(MnuPrincipalPage);        
      } 
      )
    })
  }

  guardarDatosStorage(){
    var perfil={};
    perfil["image"] = this.image;
    perfil["nombre"] =this.nombre;
    perfil["apellido"] = this.apellido;
    perfil["username"] = this.username
    this.storage.set("object", perfil).then((successData)=>{
      console.log("Data Stored");
      console.log(successData);
    })
    
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
}
