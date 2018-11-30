import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

/*
  Generated class for the ServiciosTuristicosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosTuristicosServiceProvider {
  // private apiUrl = 'http://127.0.0.1/servidorPortalTuristico/getHoteles';

  constructor(public http: HttpClient) {
    console.log('Hello ServiciosTuristicosServiceProvider Provider');
  }

  getCatAgencias(){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getCatAgencias")
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
  getCatAlojamientos(){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getCatAlojamientos")
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

  getCatAlimentos(){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getCatAlimentos")
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

  getCatIntermediacion(){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getCatIntermediacion")
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
  getRestaurants(){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getRestaurantes")
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

  getHoteles(): Observable<string[]> {
    return this.http.get('http://127.0.0.1/servidorPortalTuristico/getHoteles').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getHostales(): Observable<string[]> {
    return this.http.get('http://127.0.0.1/servidorPortalTuristico/getHostales').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
  getHosterias(): Observable<string[]> {
    return this.http.get('http://127.0.0.1/servidorPortalTuristico/getHosterias').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getRestaurantes(): Observable<string[]> {
    return this.http.get('http://127.0.0.1/servidorPortalTuristico/getRestaurantes').pipe(
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
    return this.http.get('http://127.0.0.1/servidorPortalTuristico/getServicios').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

 

  getServicio(st_id){
    return new Promise(
      resolve => {
        this.http.get("http://127.0.0.1/servidorPortalTuristico/getServicio/"+st_id)
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
