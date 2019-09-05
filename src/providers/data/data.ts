import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getAbout(){
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getAbout")
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

  getSiderData(){
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getSliderData")
        .subscribe(
          data =>{    
            resolve(data);
          },
          err=>{
            console.log("No data");            
          }
        )
      } 
    )
  }

}
