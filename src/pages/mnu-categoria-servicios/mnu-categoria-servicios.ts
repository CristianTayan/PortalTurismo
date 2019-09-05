import { ServiciosCategoriaPage } from './../servicios-categoria/servicios-categoria';
import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MnuCategoriaServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mnu-categoria-servicios',
  templateUrl: 'mnu-categoria-servicios.html',
})
export class MnuCategoriaServiciosPage {
  categorias;
  errorMessage: string;
  descending: boolean = false;
  order: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicios:ServiciosTuristicosServiceProvider) {
   this.getCategorias();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MnuCategoriaServiciosPage');
  }

  getCategorias(){
    this.servicios.getCategoriaServicio()
    .subscribe(
      categorias => this.categorias = categorias,
       error =>  this.errorMessage = <any>error);
      
  }
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  serviciosPorCategoria(cat_id, cat_nombre){
    this.navCtrl.push(ServiciosCategoriaPage,{
      id:cat_id,
      nombre:cat_nombre
    })
  }

}
