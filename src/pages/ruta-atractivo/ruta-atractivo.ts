import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;


/**
 * Generated class for the RutaAtractivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruta-atractivo',
  templateUrl: 'ruta-atractivo.html',
})
export class RutaAtractivoPage {

  at_nombre = this.navParams.get('nombre');
  at_latitud = JSON.parse(this.navParams.get('latitud'));
  at_longitud = JSON.parse(this.navParams.get('longitud'));  
  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  idioma = localStorage.getItem('idioma');
  

  constructor(
    private geolocation: Geolocation,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) 
  {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  }

  ionViewDidLoad(){
    this.getPosition();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('mapa');
    let panelEle: HTMLElement = document.getElementById('panel');
  
    // create LatLng object
    this.myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 17,
      mapTypeId: 'roadmap'  
    });
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }
  
  private calculateRoute(){
    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.at_latitud, this.at_longitud),
      // waypoints: this.waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)=> {
      if(status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });  
  
  }

}
