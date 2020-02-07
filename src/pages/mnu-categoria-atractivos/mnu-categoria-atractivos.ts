import { AtractivosTuristicosPage } from './../atractivos-turisticos/atractivos-turisticos';
import { AtractivosTuristicosServiceProvider } from './../../providers/atractivos-turisticos-service/atractivos-turisticos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaAtractivoServiceProvider } from '../../providers/categoria-atractivo-service/categoria-atractivo-service';

/**
 * Generated class for the MnuCategoriaAtractivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mnu-categoria-atractivos',
  templateUrl: 'mnu-categoria-atractivos.html',
  providers:[CategoriaAtractivoServiceProvider]
})
export class MnuCategoriaAtractivosPage {
  categorias;
  atractivos;
  idioma = localStorage.getItem('idioma');
  constructor(public navCtrl: NavController, public atractivosService: AtractivosTuristicosServiceProvider, public navParams: NavParams, public categoriaService: CategoriaAtractivoServiceProvider) {
    this.categoriaService.getCategorias()
      .then(
        data => {
          this.categorias = data;
        }
      )
      .catch(
        error => {
          console.log(error);

        }
      )

  }

  getAtractivoporCategoria(at_id){
    this.navCtrl.push(AtractivosTuristicosPage,{
      ta_id : at_id
    })
 }
}
