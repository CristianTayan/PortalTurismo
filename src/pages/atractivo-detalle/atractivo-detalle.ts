import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-atractivo-detalle',
  templateUrl: 'atractivo-detalle.html',
})
export class AtractivoDetallePage {
  at_id:number;
  at_nombre:string;
  at_descripcion_corta:string;
  at_img_atractivo:string;
  at_contacto:string;
  at_descripcion_larga:string;
  at_longitud:string;
  at_latitud:string;
  at_email:string;
  at_direccion:string;
  at_comollegar:string;
  at_red_social:string;
  at_video_atractivo:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.at_id = this.navParams.get('id');  
    this.at_nombre = this.navParams.get('nombre');  
    this.at_descripcion_corta= this.navParams.get('descripcioncorta');
    this.at_img_atractivo = this.navParams.get('imagen');
    this.at_contacto = this.navParams.get('contacto');
    this.at_descripcion_larga = this.navParams.get('descripcionlarga');
    this.at_longitud = this.navParams.get('longitud');
    this.at_latitud = this.navParams.get('latitud');
    this.at_email = this.navParams.get('email');
    this.at_direccion = this.navParams.get('direccion');
    this.at_comollegar = this.navParams.get('comollegar');
    this.at_red_social = this.navParams.get('redsocial');
    this.at_video_atractivo = this.navParams.get('video');   

  }
}
