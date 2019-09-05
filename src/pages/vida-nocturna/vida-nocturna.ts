import { RutaServicioPage } from './../ruta-servicio/ruta-servicio';
import { ServicioPage } from './../servicio/servicio';
import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VidaNocturnaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vida-nocturna',
  templateUrl: 'vida-nocturna.html',
})
export class VidaNocturnaPage {
  public isSearchbarOpened = false;
  bares;
  errorMessage: string;
  descending: boolean = false;
  order: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private servicioService: ServiciosTuristicosServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VidaNocturnaPage');
    this.getVidaNocturna();
  }

  getVidaNocturna(){
    this.servicioService.getVidaNocturna()
    .subscribe(
      bares => this.bares = bares,
       error =>  this.errorMessage = <any>error);
  }
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  AbrirServicio(st_id, st_nombre, st_pagina_web, st_latitud, st_longitud, st_celular,st_red_social, st_video_servicio, st_img_servicio){
    this.navCtrl.push(ServicioPage,{
       id : st_id,
       nombre : st_nombre,
       web: st_pagina_web,
       latitud: st_latitud,
       longitud: st_longitud,
       celular: st_celular,
       redsocial : st_red_social,
       video : st_video_servicio,
       img: st_img_servicio   
    });
  }

  pasarCoordenadasRuta(st_latitud, st_longitud, st_nombre){
    this.navCtrl.push(RutaServicioPage,{
      latitud:st_latitud,
      longitud:st_longitud,
      nombre: st_nombre
    })
  }

}
