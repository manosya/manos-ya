import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../pages.index';

@Component({
    selector: 'page-pagina3',
    templateUrl: 'pagina3.html'
})
export class Pagina3Page {
    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad Pagina3Page');
    }

    irHome() {
        this.navCtrl.setRoot(HomePage);
    }
}
