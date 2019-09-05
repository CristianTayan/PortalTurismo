import { AtractivoPage } from './../atractivo/atractivo';
// import { AtractivoDetallePage } from './../atractivo-detalle/atractivo-detalle';
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
  ta_id;
  ocultar: boolean = true;

   constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public atractivosService: AtractivosTuristicosServiceProvider,
                public toast: ToastController) {
      this.ocultar = !this.ocultar;
      this.ta_id = this.navParams.get('ta_id');
      this.getAtractivos();   
      
  }

  presentToast() {
    let toast = this.toast.create({
      message: 'Lugares encontrados',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  getAtractivos(){
    this.atractivosService.getCategoriaAtractivo(this.ta_id)
    .then(data => {
      this.atractivos = data;
    })
  }

  AbrirAtractivos(at_id, at_nombre, at_video_atractivo, at_latitud, at_longitud, at_img_atractivo){
    this.navCtrl.push(AtractivoPage,{
       id : at_id,
       nombre: at_nombre,
       web: at_video_atractivo,
       latitud: at_latitud,
       longitud: at_longitud,
       img: at_img_atractivo
    });
  }

  doRefresh(refresher) {
    this. getAtractivos();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
