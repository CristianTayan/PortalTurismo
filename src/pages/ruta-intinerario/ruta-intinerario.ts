import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;


/**
 * Generated class for the RutaIntinerarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruta-intinerario',
  templateUrl: 'ruta-intinerario.html',
})
export class RutaIntinerarioPage {

  ir_latitud =  JSON.parse(this.navParams.get('latitud'));
  ir_longitud =  JSON.parse(this.navParams.get('longitud'));
  ir_nombre_lugar = this.navParams.get('nombre');
  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private geolocation: Geolocation,
) {
this.directionsService = new google.maps.DirectionsService();
this.directionsDisplay = new google.maps.DirectionsRenderer();
this.bounds = new google.maps.LatLngBounds();
}

ionViewDidLoad(){
  // console.log(this.ir_latitud ,this.ir_longitud);
  
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
zoom: 16,
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
destination: new google.maps.LatLng(this.ir_latitud, this.ir_longitud),
waypoints: this.waypoints,
optimizeWaypoints: true,
travelMode: google.maps.TravelMode.DRIVING,
avoidTolls: true,
}, (response, status)=> {
if(status === google.maps.DirectionsStatus.OK) {
console.log(response);
this.directionsDisplay.setDirections(response);
}else{
alert('Could not display directions due to: ' + status);
}
});  

}

}
