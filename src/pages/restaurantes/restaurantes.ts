import { ServicioPage } from './../servicio/servicio';
import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RestaurantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurantes',
  templateUrl: 'restaurantes.html',
})
export class RestaurantesPage {
  restaurantes:string[];
  errorMessage: string;
  descending: boolean = false;
  order: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicioService: ServiciosTuristicosServiceProvider) {
  }

  ionViewDidLoad() {
    this.getRestaurantes();
  }

  getRestaurantes(){
    this.servicioService.getRestaurantes()
    .subscribe(
      restaurantes => this.restaurantes = restaurantes,
       error =>  this.errorMessage = <any>error);
  }
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  AbrirServicio(st_id, st_pagina_web, st_latitud, st_longitud){
    this.navCtrl.push(ServicioPage,{
       id : st_id,
       web: st_pagina_web,
       latitud: st_latitud,
       longitud: st_longitud      
    });
  }

}
