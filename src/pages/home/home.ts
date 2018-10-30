import { MnuPrincipalPage } from './../mnu-principal/mnu-principal';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController) {

  }

  // loginFacebook(){
  //   this.facebook.login(['public_profile', 'email'])
  //   .then(rta => {
  //     console.log(rta.status);
  //     if(rta.status == 'connected'){
  //       this.getInfo();
  //     };
  //   })
  //   .catch(error =>{
  //     console.error( error );
  //   });
  // }

  // getInfo(){
  //   this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
  //   .then(data=>{
  //     console.log(data);
      
  //   })
  //   .catch(error =>{
  //     console.error( error );
  //   });
  // }

  entrar(){
    this.navCtrl.push(MnuPrincipalPage);
  }

}
