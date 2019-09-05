import {NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

declare const google:any;

@Component({
  selector: 'map-hotel',
  templateUrl: 'map-hotel.html'
})
export class MapHotelComponent {
  
  @ViewChild("map") mapElement;
  map: any;
  latitud = this.navParams.get('latitud');
  longitud = this.navParams.get('longitud');

  constructor(private navParams: NavParams) {
    
  }

  ngOnInit(){
    this.initMap();
  }

  initMap(){

    let coords = new google.maps.LatLng(this.latitud,this.longitud);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
    
  
  
    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords,
      animation: google.maps.Animation.DROP,
    })
    console.log(marker);
  }
}
