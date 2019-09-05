import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

/**
 * Generated class for the VisitReasonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-reasons',
  templateUrl: 'visit-reasons.html',
})
export class VisitReasonsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public imageViewerCtrl: ImageViewerController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitReasonsPage');
  }

  onClick(imageToView) {
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }
}
