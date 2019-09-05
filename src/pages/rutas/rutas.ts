import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosTuristicosServiceProvider } from '../../providers/servicios-turisticos-service/servicios-turisticos-service';
import { IntinerarioPage } from '../intinerario/intinerario';

/**
 * Generated class for the RutasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rutas',
  templateUrl: 'rutas.html',
})
export class RutasPage {
  rutas;
  public isSearchbarOpened = false;
  // restaurantes:string[];
  errorMessage: string;
  descending: boolean = false;
  order: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicioService:ServiciosTuristicosServiceProvider) {
  }

  ionViewDidLoad() {
    this.getRutas();
  }
  

  getRutas(){
    this.servicioService.getRutas()
    .subscribe(
      rutas => this.rutas = rutas,
       error =>  this.errorMessage = <any>error);
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  verIntinerario(rt_id){
    this.navCtrl.push(IntinerarioPage,{
      id : rt_id
    })
  }

}
