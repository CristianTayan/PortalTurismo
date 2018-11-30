import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import L from "leaflet";
// import leaflet from "leaflet";
import { Geolocation } from '@ionic-native/geolocation';
import a from 'leaflet-routing-machine'


/**
 * Generated class for the MapaDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa-detalle',
  templateUrl: 'mapa-detalle.html',
})
export class MapaDetallePage {
  map;
  center: L.PointTuple;
  at_latitud ;
  at_longitud;
  at_nombre;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {    
    this.at_latitud = this.navParams.get('latitud');
    this.at_longitud = this.navParams.get('longitud');
    this.at_nombre = this.navParams.get('nombre');      
    this.leafletMap()
  }

  ionViewDidLoad() {
        
    this.map = L.map('mapId').setView([0.336337, -78.122634], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).on('locationfound', (e) => {
      let markerGroup = L.featureGroup();
      let marker: any = L.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).addTo(this.map);
  }

  leafletMap(){
    var latitud = this.at_latitud;
    var longitud = this.at_longitud;
    this.geolocation.getCurrentPosition().then((resp) => {
      resp.coords.latitude;
      resp.coords.longitude;
      var control = L.Routing.control({
        waypoints: [
          L.latLng(resp.coords.latitude, resp.coords.longitude),
          L.latLng(latitud, longitud)
        ],
        lineOptions: {
          styles: [{color: '#ff5131', opacity: 1, weight: 5}]
       },
       routeWhileDragging: true,
       show: false,
       language: 'es',
       autoRoute: true
      })
      .addTo(this.map);
      control.hide();
      a.marker([latitud,longitud]).addTo(this.map)
      .bindPopup("<b>"+this.at_nombre,+"</b>" + "' height='60' width='60'/>"+"<button>Ver lugar</button>")
      .openPopup(); 
     }).catch((error) => {
       console.log('Error getting location', error);
     });    
          
  }

}
