import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
import { CONSTANTES } from './../constantes/constantes';

@Injectable()
export class PushNotificationProvider {
    playerId: string = '';

    constructor(
        private oneSignal: OneSignal,
        public platform: Platform
    ) {}

    inicializarServicio() {
        if (this.platform.is('cordova')) {
            this.oneSignal.startInit(
                CONSTANTES.PUSH_ONESIGNAL_APP_ID,
                CONSTANTES.PUSH_FIREBASE_PROYECT_NUMBER
            );

            this.oneSignal.inFocusDisplaying(
                this.oneSignal.OSInFocusDisplayOption.Notification
            );

            this.oneSignal.handleNotificationReceived().subscribe((resp) => {
                console.log('Push-data recibido: ' + JSON.stringify(resp));
            });

            this.oneSignal.handleNotificationOpened().subscribe((resp) => {
                console.log('Push-data abierta: ' + JSON.stringify(resp));
            });

            this.oneSignal.getIds().then(resp => {
                this.playerId = resp.userId;
            });

            this.oneSignal.endInit();
        } else {
            console.log('OneSignal no funciona en escritorio');
        }
    }
}
