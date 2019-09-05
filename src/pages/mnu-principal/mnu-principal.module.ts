import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MnuPrincipalPage } from './mnu-principal';
import { StarRatingModule } from 'ionic3-star-rating';
import { Ionic2RatingModule } from 'ionic2-rating';
import { TranslateModule } from '@ngx-translate/core'
@NgModule({
  declarations: [
    // MnuPrincipalPage,
  ],
  imports: [
    // IonicPageModule.forChild(MnuPrincipalPage),
    StarRatingModule,
    Ionic2RatingModule,
    TranslateModule
  ],

})
export class MnuPrincipalPageModule {}
