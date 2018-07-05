import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { IMensajeAlerta } from '../../interfaces/interfaces';
import { IMAGEN_64 } from './imagen64.data';
import { AppVersion } from '@ionic-native/app-version';

@Injectable()
export class UtilidadesProvider {
    tieneInternet: boolean = true;

    constructor(
        public http: HttpClient,
        public alertCtrl: AlertController,
        public network: Network,
        public appVersion: AppVersion,
        public platform: Platform
    ) {}

    actualizarTieneInternet(conectado: boolean) {
        this.tieneInternet = conectado;
    }

    mostrarAlertaSinInternet() {
        let alert = this.alertCtrl.create({
            title: 'Sin conexión',
            subTitle: 'Verifique su conexión a internet y vuelva a intentarlo nuevamente',
            buttons: ['Aceptar']
        });
        alert.present();
    }

    mostrarAlertaDatosInvalidos() {
        let alert = this.alertCtrl.create({
            title: 'Datos no válidos',
            subTitle: 'Verifique los datos del formulario para poder continuar',
            buttons: ['Aceptar']
        });
        alert.present();
    }

    formatearRut(rut: string) {
        //se quita espacios, puntos y guión
        const er = new RegExp(/ |-|\./ig);
        rut = rut.replace(er, '');
        let dv = rut.substring(rut.length - 1, rut.length);
        rut = rut.substring(0, rut.length - 1);

        return rut + '-' + dv;
    }

    mostrarAlerta(alerta: IMensajeAlerta) {
        if (!alerta.textoBoton) {
            alerta.textoBoton = 'Aceptar';
        } else {
            alerta.textoBoton = (alerta.textoBoton.length > 0) ? alerta.textoBoton : 'Aceptar';
        }

        let alert = this.alertCtrl.create({
            title: alerta.titulo,
            subTitle: alerta.descripcion,
            buttons: [alerta.textoBoton]
        });
        alert.present();
    }

    mostrarAlertaErrorServidor(err: any) {
        let alert = this.alertCtrl.create({
            title: 'Error de servidor',
            subTitle: `Se produjo un error desconocido, y no podemos procesar su solicitud.<br>[code: ${ err.status }, name: ${ err.name }]`,
            buttons: ['Aceptar']
        });
        alert.present();
    }

    inicializarMonitoreoEstadoRed() {
        // monitorea el estado de conexion a internet
        this.network.onDisconnect()
            .subscribe(() => {
                this.actualizarTieneInternet(false);
            });
    
        this.network.onConnect()
            .subscribe(data => {
                this.actualizarTieneInternet(true);
            },
            error => console.error(error)
        );
    }

    obtenerImagen64Aleatoria() {
        const listado = IMAGEN_64.slice();
        const indiceRandom = Math.floor((Math.random() * 3));
        const contenido = listado[indiceRandom].contenido;
        return contenido;   
    }

    obtenerVersionAplicacion() {
        return new Promise((resolve, reject) => {
            if (!this.platform.is('cordova')) {
                resolve('[Modo escritorio]');
            } else {
                this.appVersion.getVersionNumber()
                    .then(resp => {
                        resolve('v' + resp);
                    });
            }
        });
    }

}
