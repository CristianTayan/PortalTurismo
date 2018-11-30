import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosTuristicosServiceProvider } from '../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html',
})
export class ServicioPage {
  st_id;
  st_pagina_web;
  servicios;
  menus: string = "Informacion";
  distancia;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iab: InAppBrowser, 
              private geolocation: Geolocation,
              public servicioService: ServiciosTuristicosServiceProvider, 
              private _haversineService: HaversineService) {}

  ionViewDidLoad() {
    this.st_pagina_web = this.navParams.get('web');
    this.calcularDistancia();
    this.servicio();
  }
  servicio(){
    this.st_id = this.navParams.get('id');
    this.servicioService.getServicio(this.st_id)
    .then(
      data => {
        this.servicios = data;         
      }
    )
  }

  openLink(){
    this.iab.create(this.st_pagina_web,"_blank");
  }
  calcularDistancia() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let miUbicacion: GeoCoord = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
    };
    let destino: GeoCoord = {
      latitude: this.navParams.get('latitud'),
      longitude: this.navParams.get('longitud')
  };
    // let meters = this._haversineService.getDistanceInMeters(miUbicacion, destino);
    let kilometers = this._haversineService.getDistanceInKilometers(miUbicacion, destino);
    // let miles = this._haversineService.getDistanceInMiles(miUbicacion, destino);
    this.distancia = Math.round(kilometers * 100) / 100
   });    
  }
  
}
