import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pagina3Page } from '../pages.index';

@Component({
    selector: 'page-pagina1',
    templateUrl: 'pagina1.html'
})
export class Pagina1Page {
    pagina3: any = Pagina3Page;

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad Pagina1Page');
    }
}
