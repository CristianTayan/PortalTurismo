import { RutaServicioPage } from './../ruta-servicio/ruta-servicio';
import { ServicioPage } from './../servicio/servicio';
import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServiciosCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicios-categoria',
  templateUrl: 'servicios-categoria.html',
})
export class ServiciosCategoriaPage {
  services;
  cat_id = this.navParams.get('id');
  cat_nombre = this.navParams.get('nombre');
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicios: ServiciosTuristicosServiceProvider) {
    this.ServiciosPorCategoria();
  }

  ionViewDidLoad() {
    console.log(this.cat_id);
    
    
  }

  ServiciosPorCategoria(){
    this.servicios.getServicioPorCategoria(this.cat_id)
    .then(
      data => {
        this.services = data;          
        console.log(this.services);
               
      }
    )
  }

  AbrirServicio(st_id, st_nombre, st_pagina_web, st_latitud, st_longitud, st_celular, st_img_servicio){
    this.navCtrl.push(ServicioPage,{
       id : st_id,
       nombre : st_nombre,
       web: st_pagina_web,
       latitud: st_latitud,
       longitud: st_longitud,
       celular: st_celular,
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
