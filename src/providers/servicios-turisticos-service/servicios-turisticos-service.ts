import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the ServiciosTuristicosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosTuristicosServiceProvider {
  // private apiUrl = 'https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getHoteles';

  constructor(public http: HttpClient,public toastCtrl: ToastController) {
    console.log('Hello ServiciosTuristicosServiceProvider Provider');
  }

  noData() {
    const toast = this.toastCtrl.create({
      message: 'No se han ingresado datos',
      duration: 3000
    });
    toast.present();
  }

  getServicioPorCategoria(id){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getServicioPorCategoria/"+id)
        .subscribe(
          data =>{
            resolve(data);
            // console.log(data);
            
          },
          err=>{
            this.noData();            
          }
        )
      } 
    );
  }

  getCatAgencias(){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getCatAgencias")
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
  getCatAlojamientos(){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getCatAlojamientos")
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

  getCatAlimentos(){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getCatAlimentos")
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

  getCatIntermediacion(){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getCatIntermediacion")
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
  getRestaurants(){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getRestaurantes")
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

  getHoteles(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getHoteles').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getHostales(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getHostales').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
  getHosterias(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getHosterias').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getRestaurantes(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getRestaurantes').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getVidaNocturna(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getVidaNocturna').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getServicios(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getServicios').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getCategoriaServicio(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getCategoriasServicio').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getRutas(): Observable<string[]> {
    return this.http.get('https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getRutas').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

 

  getServicio(st_id){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getServicio/"+st_id)
        .subscribe(
          data  =>{
            resolve(data);            
          },
          err=>{
            console.log("No data");            
          }
        )
      } 
    );
  }

  getIntinerario(rt_id){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getRuta/"+rt_id)
        .subscribe(
          data  =>{
            resolve(data);            
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
        this.http.post("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/addcoment", data)
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

  getComentById(st_id){
    return new Promise(
      resolve => {
        this.http.get("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/getComentById/"+st_id)
        .subscribe(
          data  =>{
            resolve(data);                        
          },
          err=>{
            console.log("No data");            
          }
        )
      } 
    );
  }
  deleteComent(simg_id){
    return new Promise(
      resolve=>{
        this.http.delete("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/deleteComent/"+simg_id)
        .subscribe(
          data => {
            resolve(data);
          },
          err=>{
            console.log(err);
          }
        )
      }
    );
  }

  registro(data){
    return new Promise(
      resolve=>{
        this.http.post("https://portalciudadano.ibarra.gob.ec/srvPortalTuristico/index.php/registro", data)
        .subscribe(
          data  =>{
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
