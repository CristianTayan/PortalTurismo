import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EmprendimientosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emprendimientos',
  templateUrl: 'emprendimientos.html',
})
export class EmprendimientosPage {
  emprendimientos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmprendimientosPage');
  }

  getEmprendimientos(){
    this.data.getEmprendimientos()
    .then(data =>{
      this.emprendimientos = data;
      console.log(this.emprendimientos);

    })
  }

}
