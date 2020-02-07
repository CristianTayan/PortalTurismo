import { ResetPasswordPage } from './../reset-password/reset-password';
import { MnuPrincipalPage } from './../mnu-principal/mnu-principal';
import { Perfil } from './../../models/perfil';
import { PerfilPage } from './../perfil/perfil';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import swal from 'sweetalert';
/**
 * Generated class for the LogueoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logueo',
  templateUrl: 'logueo.html',
})
export class LogueoPage {
  userData = {"username":"", "password":""};
  registerForm: FormGroup;
  idioma = localStorage.getItem('idioma');

  profileData: AngularFireObject<Perfil>

  constructor(
    public alertCtrl:AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthServiceProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public fbDatabase: AngularFireDatabase
    ) {
      this.registerForm = this.formBuilder.group({
        email:[null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      })              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogueoPage');
  }

  iniciarSesion(formulario: NgForm){
    this.authService.iniciarSesion(
      formulario.value.email,
      formulario.value.password)
      .then(info => {
        this.navCtrl.setRoot(MnuPrincipalPage);
        let toast = this.toastCtrl.create({
          message: 'Bienvenido: ' + formulario.value.email,
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      })
      .catch(error => {
        swal( "Ocurrio un error", "Error al iniciar sesion. " + error, "error")
      })
  }

  registrarUsuario(formulario: NgForm){
    this.authService.registrarUsuario(
      formulario.value.email,
      formulario.value.password)
      .then(info => {
        swal({
          title: "Usuario registrado!",
          text: "Ayudanos con tu información!",
          timer: 3000,
          icon: 'success'
          });
        this.navCtrl.push(PerfilPage);
        
      })
      .catch(error => {
        swal( "Ocurrio un error", "Ocurrio un error registrando el usuario " + error, "error")
        // let alerta = this.alertCtrl.create({
        //   title:"Ocurrio un error",
        //   message:"Ocurrio un error registrando el usuario. " + error,
        //   buttons:['OK']

        // })
        // alerta.present();
      })
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

}
