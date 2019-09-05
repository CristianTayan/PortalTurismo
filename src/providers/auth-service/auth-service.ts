import { PerfilPage } from './../../pages/perfil/perfil';
import firebase from 'firebase';
import { NavController } from 'ionic-angular';

// let apiUrl = 'http://192.168.1.10/servidorPortalTuristico/';


// @Injectable()
export class AuthServiceProvider {
  // constructor(public navCtrl: NavController){
    
  // }
   registrarUsuario(email:string, password:string){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
     
  }  

  iniciarSesion(email:string, password:string){
    
    return firebase.auth().signInWithEmailAndPassword(email, password);
     
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  terminarSesion(){
    firebase.auth().signOut();
  }
}

