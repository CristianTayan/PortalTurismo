import { MapaDetallePage } from './../mapa-detalle/mapa-detalle';
import { AtractivosTuristicosServiceProvider } from './../../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AtractivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atractivo',
  templateUrl: 'atractivo.html',
  providers:[AtractivosTuristicosServiceProvider]
})
export class AtractivoPage {
  at_id;
  atractivos;
  atractivs: string = "historia";
  latitud;
  imagenes;


  constructor(public navCtrl: NavController, public navParams: NavParams, private atractivosService: AtractivosTuristicosServiceProvider) {
    this.at_id = navParams.get('id');
    this.Atractivo();
    this.imagenesAtractivo();
  }

  Atractivo(){
    this.atractivosService.getAtractivo(this.at_id)
    .then(
      data => {
        this.atractivos = data;        
      });
  }

  imagenesAtractivo(){
    this.atractivosService.getImagenesAtractivo(this.at_id)
    .then(
      data => {
        this.imagenes = data;        
      }
    )
  }
  
  pasarCoordenadas(at_longitud, at_latitud, at_nombre){
    this.navCtrl.push(MapaDetallePage,{
      latitud:at_latitud,
      longitud:at_longitud,
      nombre: at_nombre
    })
  }

}
