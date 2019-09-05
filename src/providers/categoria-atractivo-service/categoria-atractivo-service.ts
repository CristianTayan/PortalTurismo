import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoriaAtractivoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriaAtractivoServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CategoriaAtractivoServiceProvider Provider');
  }

  getCategorias(){
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getCategorias")
        .subscribe(
          data =>{    
            resolve(data);
          },
          err=>{
            console.log("No data");            
          }
        )
      } 
    );
  }

  getCategoria(id){
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getCategoria"+id)
        .subscribe(
          data =>{
            resolve(data);
          },
          err=>{
            console.log("No data");            
          }
        )
      } 
    );
  }

}
