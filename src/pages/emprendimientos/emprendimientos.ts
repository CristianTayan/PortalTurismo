import { EmprendimientoPage } from './../emprendimiento/emprendimiento';
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
  idioma = localStorage.getItem('idioma');

  constructor(public navCtrl: NavController, public navParams: NavParams, public datos: DataProvider) {
  }

  ionViewDidLoad() {
    this.getEmprendimientos();
  }

  getEmprendimientos(){
    this.datos.getEmprendimientos().then(res => {
      this.emprendimientos = res;

    })
  };
  getEmprendimiento(em_id, em_latitud, em_longitud){
    this.navCtrl.push(EmprendimientoPage,{
      id : em_id,
      latitud : em_latitud,
      longitud : em_longitud
    })
  }

}
