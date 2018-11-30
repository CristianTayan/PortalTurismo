import { RestaurantesPage } from './../restaurantes/restaurantes';
import { BuscarServicioPage } from './../buscar-servicio/buscar-servicio';
import { ServicioPage } from './../servicio/servicio';
import { AtractivoPage } from './../atractivo/atractivo';
import { AtractivosTuristicosServiceProvider } from './../../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MnuCategoriaAtractivosPage } from '../mnu-categoria-atractivos/mnu-categoria-atractivos';
import { ServiciosTuristicosServiceProvider } from '../../providers/servicios-turisticos-service/servicios-turisticos-service';


/**
 * Generated class for the MnuPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mnu-principal',
  templateUrl: 'mnu-principal.html',
  providers:[AtractivosTuristicosServiceProvider]
})

export class MnuPrincipalPage {
  public isSearchbarOpened = false;
  menus;
  atractivos;
  numAtractivos;
  hoteles;
  numHoteles;
  hostales;
  numHostales;
  restaurantes;
  numRestaurantes;
  distancia;
  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, private atractivosService: AtractivosTuristicosServiceProvider,
              public servicioService: ServiciosTuristicosServiceProvider) {   
    this.atractivosService.getAtractivos()
    .then(
     data => {
       this.atractivos = data;    
     });
     
  }

  ionViewDidLoad(){
    this.numeroAtractivos();
    this.getHoteles();
    this.numeroHoteles();
    this.getHostales();
    this.numeroHostales();
    this.getRestaurantes();
    this.numeroRestaurantes();
  }

  numeroAtractivos(){
    this.atractivosService.getAtractivos()
    .then(
     data => {
      this.numAtractivos = Object.keys(data).length 
     });
  }

  AbrirAtractivos(at_id){
    this.navCtrl.push(AtractivoPage,{
       id : at_id
    });
  }

  abrirCategorias(){
    this.navCtrl.push(MnuCategoriaAtractivosPage)
  }

  onSearch(event){
    console.log(event.target.value);
    
  }
  buscarServicios(){
    this.navCtrl.push(BuscarServicioPage);
  }

  getHoteles(){
    this.servicioService.getHoteles()
    .subscribe(
      data => {
        this.hoteles = data;
      }
    )
  }

  numeroHoteles(){
    this.servicioService.getHoteles()
    .subscribe(
      data => {
        this.numHoteles = Object.keys(data).length;
      }
    )
  }

  getHostales(){
    this.servicioService.getHostales()
    .subscribe(
      data => {
        this.hostales = data;
      }
    )
  }

  numeroHostales(){
    this.servicioService.getHostales()
    .subscribe(
      data => {
        this.numHostales = Object.keys(data).length;
      }
    )
  }

  getRestaurantes(){
    this.servicioService.getRestaurantes()
    .subscribe(
      data => {
        this.restaurantes = data;
      }
    )
  }

  numeroRestaurantes(){
    this.servicioService.getRestaurantes()
    .subscribe(
      data => {
        this.numRestaurantes = Object.keys(data).length;
      }
    )
  }

  AbrirServicio(st_id, st_pagina_web, st_latitud, st_longitud){
    this.navCtrl.push(ServicioPage,{
       id : st_id,
       web: st_pagina_web,
       latitud: st_latitud,
       longitud: st_longitud      
    });
  }

  abrirRestaurantesPage(){
    this.navCtrl.push(RestaurantesPage);
  }
  
}
