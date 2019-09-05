import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
 

@Injectable()
export class AtractivosTuristicosServiceProvider {
  
  atractivos;
  constructor(public http: HttpClient, public toastCtrl: ToastController) {
    
  }

  noData() {
    const toast = this.toastCtrl.create({
      message: 'No se han ingresado datos',
      duration: 3000
    });
    toast.present();
  }

  getAtractivos(){

    // return this.http.get('http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getAtractivos');
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getAtractivos")
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

  getAtractivo(at_id){
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getAtractivo/"+at_id)
        .subscribe(
          data  =>{
            resolve(data);
            console.log(data);
            
          },
          err=>{
            console.log("No data");            
          }
        )
      } 
    );
  }

  getCategoriaAtractivo(id){
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getAtractivoCategoria/"+id)
        .subscribe(
          data =>{
            resolve(data);
          },
          err=>{
            this.noData();            
          }
        )
      } 
    );
  }

  getImagenesAtractivo(at_id){
    return new Promise(
      resolve => {
        this.http.get("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/getImagenes/"+at_id)
        .subscribe(
          data  =>{
            resolve(data);
            console.log(data); 
          },
          err=>{
            console.log("No data");            
          }
        )
      } 
    );
  }
  addComentario(data){
    return new Promise(
      resolve=>{
        this.http.post("http://desarrollosigm.ibarra.gob.ec/servidorPortalTuristico/index.php/addcomentatractivo", data)
        .subscribe(
          data  =>{
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
