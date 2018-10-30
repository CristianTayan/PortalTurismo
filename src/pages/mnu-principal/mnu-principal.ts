import { MnuCategoriaAtractivosPage } from './../mnu-categoria-atractivos/mnu-categoria-atractivos';
import { MenuServiceProvider } from './../../providers/menu-service/menu-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MnuPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mnu-principal',
  templateUrl: 'mnu-principal.html',
  providers:[MenuServiceProvider]
})

export class MnuPrincipalPage {
  public isSearchbarOpened = false;
  menus;
  constructor(public navCtrl: NavController, public navParams: NavParams
              ,public menuService: MenuServiceProvider) {
                this.menuService.getAll()
                .then(
                  data => {
                    console.log(data);
                    this.menus = data;
                  }
                )
                .catch(
                  error => {
                    console.log(error);
                    
                  }
                )

  
  }
  AbrirAtractivos(){
    
    this.navCtrl.push(MnuCategoriaAtractivosPage);
  }

  onSearch(event){
    console.log(event.target.value);
    
  }
  

}
