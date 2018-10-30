// import { Observable } from 'rxjs/Observable';
import { AtractivoDetallePage } from './../atractivo-detalle/atractivo-detalle';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtractivosTuristicosServiceProvider } from '../../providers/atractivos-turisticos-service/atractivos-turisticos-service';


@IonicPage()
@Component({
  selector: 'page-atractivos-turisticos',
  templateUrl: 'atractivos-turisticos.html',
  providers:[AtractivosTuristicosServiceProvider]
})
export class AtractivosTuristicosPage {
  atractivos;
  ocultar: boolean     = true;
  
   constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public atractivosService: AtractivosTuristicosServiceProvider,
    public toast: ToastController) {
      this.ocultar = !this.ocultar;
    this.atractivosService.getAtractivos()
    .then(data => {
      this.atractivos = data;
      console.log(this.atractivos);
    })
      
  }

  atractivoDetalle( at_id, at_nombre, at_descripcion_corta, at_img_atractivo
    ,at_contacto, at_descripcion_larga, at_longitud, at_latitud, at_email, at_direccion,  at_comollegar
    ,at_red_social, at_video_atractivo) {
    this.navCtrl.push(AtractivoDetallePage,{
      id : at_id,
      nombre: at_nombre,
      descripcioncorta: at_descripcion_corta,
      imagen : at_img_atractivo,
      contacto :at_contacto,
      descripcionlarga :at_descripcion_larga,
      longitud : at_longitud,
      latitud : at_latitud,
      email : at_email,
      direccion : at_direccion,
      comollegar : at_comollegar, 
      redsocial : at_red_social,     
      video : at_video_atractivo
    })
    // this.atractivosService.getAtractivo(at_id)
    // .then(at_id =>{
    //   this.navCtrl.push(AtractivoDetallePage,{
    //   at_id : at_id    
    // })          
    // })
    // .catch(
    //   (error:any) =>{
    //     this.toast.create({message:'Error al recuperar dato'+ error.error, position:'botton', duration:3000});
    //   }
    // )
  }
      

}
