import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MnuPrincipalPage } from './mnu-principal';

@NgModule({
  declarations: [
    MnuPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(MnuPrincipalPage),
  ],
})
export class MnuPrincipalPageModule {}
