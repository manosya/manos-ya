import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { CONSTANTES } from '../../providers/constantes/constantes';

@Component({
    selector: 'page-pagina-modal',
    templateUrl: 'pagina-modal.html'
})
export class PaginaModalPage {
    unregisterBackButtonAction: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public platform: Platform
    ) {}

    ionViewWillEnter() {
        // registra el boton atras
        this.initializeBackButtonCustomHandler();
    }

    ionViewWillLeave() {
        // Anula el registro de la acción del botón Atrás personalizado para esta página
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    initializeBackButtonCustomHandler() {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(event => {
            this.cerrar();
        }, CONSTANTES.BACKBUTTON_PRIORIDAD_ALTA);
    } 

    cerrar() {
        this.viewCtrl.dismiss();
    }
}
