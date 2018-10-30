import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MenuServiceProvider Provider');
  }
  getAll(){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getDatosMenu")
        .map(res=> res)
        .subscribe(
          data =>{    
            resolve(data);
          },
          err=>{
            console.log(err);            
          }
        )
      } 
    );
  }

  getMenu(id){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1:8080/getMenu"+id)
        .map(res=> res)
        .subscribe(
          data =>{
            resolve(data);
          },
          err=>{
            console.log(err);            
          }
        )
      } 
    );
  }

}
