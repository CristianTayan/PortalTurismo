import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  datos;
  public isTextOpened = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public about: DataProvider) {
  }

  ionViewDidLoad() {
    this.getAbout();
  }

  getAbout(){
    this.about.getAbout()
    .then(
      data => {
        this.datos = data;   
        console.log(this.datos);
             
      }
    )    
  }


}
