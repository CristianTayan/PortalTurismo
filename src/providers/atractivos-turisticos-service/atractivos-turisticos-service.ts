import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
 

@Injectable()
export class AtractivosTuristicosServiceProvider {
  
  atractivos;
  constructor(public http: HttpClient) {
    
  }

  getAtractivos(){

    // return this.http.get('http://127.0.0.1/servidorPortalTuristico/getAtractivos');
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getAtractivos")
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

  getAtractivo(at_id){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getAtractivo/"+at_id)
        .subscribe(
          data  =>{
            resolve(data);
            console.log(data);
            
          },
          err=>{
            console.log(err);            
          }
        )
      } 
    );
  }

  getCategoriaAtractivo(id){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getAtractivoCategoria/"+id)
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

  getImagenesAtractivo(at_id){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getImagenes/"+at_id)
        .subscribe(
          data  =>{
            resolve(data);
            console.log(data); 
          },
          err=>{
            console.log(err);            
          }
        )
      } 
    );
  }

}
