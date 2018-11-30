import { Ionic2RatingModule } from 'ionic2-rating';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtractivosTuristicosPage } from './atractivos-turisticos';


@NgModule({
  declarations: [
    AtractivosTuristicosPage,
  ],
  imports: [
    IonicPageModule.forChild(AtractivosTuristicosPage),
    Ionic2RatingModule
  ],
})
export class AtractivosTuristicosPageModule {}
