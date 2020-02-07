import { ServicioPage } from './../servicio/servicio';
import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
// import { ListaServiciosPage } from '../lista-servicios/lista-servicios';


@IonicPage()
@Component({
  selector: 'page-buscar-servicio',
  templateUrl: 'buscar-servicio.html',
})
export class BuscarServicioPage {
  servicioList : string[];
  errorMessage: string;
  descending: boolean = false;
  order: number;
  idioma = localStorage.getItem('idioma');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private servicios: ServiciosTuristicosServiceProvider) {}

  ionViewDidLoad(){
   this.getHoteles();
  }

  getHoteles(){
    this.servicios.getServicios()
    .subscribe(
      servicioList => this.servicioList = servicioList,
       error =>  this.errorMessage = <any>error);
  }
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  // allServicios(){
  //   this.navCtrl.push(ListaServiciosPage, {
  //      servicioList: this.servicioList
  //   });
  // }

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

}
