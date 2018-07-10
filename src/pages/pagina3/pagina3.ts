import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../pages.index';
import { CONSTANTES } from '../../providers/constantes/constantes';

@Component({
    selector: 'page-pagina3',
    templateUrl: 'pagina3.html'
})
export class Pagina3Page {
    unregisterBackButtonAction: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform
    ) {}

    ionViewWillEnter() {
        this.initializeBackButtonCustomHandler();
    }

    ionViewWillLeave() {
        // Anula el registro de la acción del botón Atrás personalizado para esta página
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    initializeBackButtonCustomHandler() {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(event => {
            this.navCtrl.pop();
        }, CONSTANTES.BACKBUTTON_PRIORIDAD_MEDIA);
    } 

    irHome() {
        this.navCtrl.setRoot(HomePage);
    }
}
