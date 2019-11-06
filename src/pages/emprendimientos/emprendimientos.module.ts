import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmprendimientosPage } from './emprendimientos';

@NgModule({
  declarations: [
    EmprendimientosPage,
  ],
  imports: [
    IonicPageModule.forChild(EmprendimientosPage),
  ],
})
export class EmprendimientosPageModule {}
