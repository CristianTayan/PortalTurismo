import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaAtractivoServiceProvider } from '../../providers/categoria-atractivo-service/categoria-atractivo-service';
import { AtractivosTuristicosPage } from '../atractivos-turisticos/atractivos-turisticos';

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
  Categoria;
  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriaAtractivoServiceProvider) {
    this.categoriaService.getCategorias()
      .then(
        data => {
          // console.log(data);
          this.categorias = data;
        }
      )
      .catch(
        error => {
          console.log(error);
          
        }
      )

  }

    getCategoria(Categoria){
      this.navCtrl.push(AtractivosTuristicosPage, {
        idCategoria: Categoria,
      })
      
    } 


}
