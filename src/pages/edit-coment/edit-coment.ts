import { MnuPrincipalPage } from './../mnu-principal/mnu-principal';
import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import swal from 'sweetalert';
import { Storage } from '@ionic/Storage';
/**
 * Generated class for the EditComentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-coment',
  templateUrl: 'edit-coment.html',
})
export class EditComentPage {

  simg_id = this.navParams.get('id');
  simg_descripcion = this.navParams.get("descripcion");
  sigm_fecha = this.navParams.get("fecha");
  simg_ruta = this.navParams.get("ruta");
  image ;
  username;
  nombre;
  apellido;
  key:string ='datos';
  perfil;
  lenguaje = localStorage.getItem('idioma');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public servicios: ServiciosTuristicosServiceProvider,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private storage: Storage) {

                console.log(this.simg_id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditComentPage');
    this.getValue();
  }
  cerrar(){
    this.viewCtrl.dismiss();
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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Eliminar el comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteComment();
            this.navCtrl.setRoot(MnuPrincipalPage);
          }
        }
      ]
    });
    alert.present();
  }



  deleteComment(){
    this.servicios.deleteComent(this.simg_id)
    .then(()=>{
    })
  }
}


