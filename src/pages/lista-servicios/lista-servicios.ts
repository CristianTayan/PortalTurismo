import { IonicPage } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
 
declare var google;

/**
 * Generated class for the ListaServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-servicios',
  templateUrl: 'lista-servicios.html',
})
export class ListaServiciosPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  servicioList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public http: Http) {
    this.servicioList = navParams.get('servicioList');
    // console.log(this.syervicioList);
  }

  ionViewDidLoad() {
    this.displayGoogleMap();
    this.getMarkers();
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(0.347842, -78.117359);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    for (let _i = 0; _i < this.servicioList; _i++) {
      if(_i > 0 )
       this.addMarkersToMap(this.servicioList[_i]);
    }
  }
  

  addMarkersToMap(servicio) {
      var position = new google.maps.LatLng(servicio.latitude, servicio.longitude);
      var servicioMarker = new google.maps.Marker({position: position, title: servicio.st_nombre});
      servicioMarker.setMap(this.map);
  }

}
