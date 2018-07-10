import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Plugins
import { HeaderColor } from '@ionic-native/header-color';

// Servicios
import { CONSTANTES } from '../providers/constantes/constantes';
import { UtilidadesProvider } from '../providers/utilidades/utilidades';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public headerColor: HeaderColor,
        public _utilidadesPrv: UtilidadesProvider,
        public _pushNotificacionPrv: PushNotificationProvider
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString(CONSTANTES.COLOR_STATUS_BAR);
            this.headerColor.tint(CONSTANTES.COLOR_STATUS_BAR);
            this.splashScreen.hide();

            // monitorea el estado de conexion a internet
            this._utilidadesPrv.inicializarMonitoreoEstadoRed();
           
            // inicializa el servicio push notificaction
            this._pushNotificacionPrv.inicializarServicio();
        });
    }    
}
