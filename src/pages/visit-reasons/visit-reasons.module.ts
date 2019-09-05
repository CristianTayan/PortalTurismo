import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitReasonsPage } from './visit-reasons';

@NgModule({
  declarations: [
    VisitReasonsPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitReasonsPage),
  ],
})
export class VisitReasonsPageModule {}
