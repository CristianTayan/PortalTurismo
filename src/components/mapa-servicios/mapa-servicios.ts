import { ServiciosTuristicosServiceProvider } from './../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { Component, ViewChild } from '@angular/core';

declare var google;


@Component({
  selector: 'mapa-servicios',
  templateUrl: 'mapa-servicios.html'
})
export class MapaServiciosComponent {

  @ViewChild("map") mapElement;
  map: any;
  restaurantes;
  errorMessage;

  constructor(public serviciosService: ServiciosTuristicosServiceProvider) {}
  
  ngOnInit(){
    this.initMap();
  }

  initMap(){
    this.serviciosService.getRestaurants()
    .then(data => {
        this.restaurantes= data;
        var miubic = {
          lat: 0.3504234,
          lng: -78.1235737,
          zoom: 18,
      };
        var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: miubic,
        disableDefaultUI: true
        });

        for (let item of this.restaurantes) {
          
          var myLatLng = {
            lat: JSON.parse(item.st_latitud),
            lng: JSON.parse(item.st_longitud)
          };
          
          var marker = new google.maps.Marker({        
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
      
      }
   
    })
  }
  
}
