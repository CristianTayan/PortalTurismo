import { Geolocation } from '@ionic-native/geolocation';
import { AtractivosTuristicosServiceProvider } from './../../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import L from "leaflet";
import leaflet from "leaflet";
import 'rxjs/add/operator/map';



@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  public isSearchbarOpened = false;
  items;
  value = '';
  atractivosList;
  center: L.PointTuple;
  map;

  redIcon = L.icon({
    iconUrl: 'https://images.vexels.com/media/users/3/131625/isolated/preview/35942a8a6bb75dc1842582deb7168bf8-orange-location-marker-infographic-by-vexels.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [35, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, 
    public atractivosService: AtractivosTuristicosServiceProvider, private geolocation: Geolocation) {
    this.atractivosService.getAtractivos()
    .then(data => {
        this.atractivosList = data;
        this.leafletMap(); 
    }) 
  }

  ionViewDidLoad() {
        
    this.map = L.map('mapId').setView([0.336337, -78.122634], 12);
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).addTo(this.map);
  }

  leafletMap(){
    this.geolocation.getCurrentPosition().then((resp) => {
      resp.coords.latitude
      resp.coords.longitude
      L.marker([ resp.coords.latitude, resp.coords.longitude ],{icon: this.redIcon}).addTo(this.map)
      .bindPopup('Tu ubicación')
      .openPopup();
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    for (let atractivo of this.atractivosList) {
      L.marker([atractivo.at_latitud, atractivo.at_longitud]).addTo(this.map)
      .bindPopup("<b>"+atractivo.at_nombre+"</b>" + "<br> <img src='"+atractivo.at_img_atractivo+"' height='60' width='60'/>")
      .openPopup();
    }
    
  }

  onSearch(event){
    console.log(event.target.value);
    
  } 

}
