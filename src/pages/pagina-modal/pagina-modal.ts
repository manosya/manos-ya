import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-pagina-modal',
    templateUrl: 'pagina-modal.html'
})
export class PaginaModalPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad PaginaModalPage');
    }

    cerrar() {
        this.viewCtrl.dismiss();
    }
}
