import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosTuristicosServiceProvider } from '../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { RutaIntinerarioPage } from '../ruta-intinerario/ruta-intinerario';

/**
 * Generated class for the IntinerarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intinerario',
  templateUrl: 'intinerario.html',
})
export class IntinerarioPage {
  rt_id = this.navParams.get('id');
  rutas;

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicioService: ServiciosTuristicosServiceProvider) {
  }

  ionViewDidLoad() {
    // console.log(this.rt_id);
    this.Intinerario();
  }

  Intinerario(){
    this.servicioService.getIntinerario(this.rt_id)
    .then(data => {
      this.rutas = data;    
      console.log(this.rutas);
       
    })
  }

  pasarCoordenadasRuta(ir_latitud, ir_longitud, ir_nombre_lugar){
    this.navCtrl.push(RutaIntinerarioPage,{
      latitud:ir_latitud,
      longitud:ir_longitud,
      nombre: ir_nombre_lugar
    })
  }


}
