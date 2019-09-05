import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserServiceProvider {

  users=[];
  constructor(public http: HttpClient,public afDB: AngularFireDatabase) {
    console.log('Hello UserServiceProvider Provider');
  }
  // public getUser(user){
  //   for(let i; i<this.users.length; i++){
  //     if(this.users[i].id == user.id){
  //       this.users[i] = user;
  //     }
  //   }
  // }
  public updateperfil(perfil){
    //Actualizamos la fruta con el id que recibimos del objeto del parametro
    this.afDB.database.ref('perfil/'+perfil.id).set(perfil);
  }
   
  public getperfil(id){
    return this.afDB.object('perfil/'+id).valueChanges();
      //Devolvera la fruta con el id que le pasamos por parametro
  }
   
  public removeperfil(id){
    this.afDB.database.ref('perfil/'+id).remove();
      //Borrará la fruta con el id que le pasamos por parametro
  }

}
