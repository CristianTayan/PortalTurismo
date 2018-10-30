import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtractivoDetallePage } from './atractivo-detalle';

@NgModule({
  declarations: [
    AtractivoDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(AtractivoDetallePage),
  ],
})
export class AtractivoDetallePageModule {}
