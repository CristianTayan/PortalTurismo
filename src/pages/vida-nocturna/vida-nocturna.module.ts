import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { VidaNocturnaPage } from './vida-nocturna';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    // VidaNocturnaPage,
  ],
  imports: [
    IonicPageModule.forChild('VidaNocturnaPage'),
    TranslateModule
  ],
})
export class VidaNocturnaPageModule {}
