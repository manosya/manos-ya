import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { IUsuario } from './../../interfaces/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import { UtilidadesProvider } from './../utilidades/utilidades';

@Injectable()
export class UsuarioProvider {
    usuario: IUsuario = null;
    notificarCambio = new EventEmitter<any>();

    constructor(
        public http: HttpClient,
        public afAuth: AngularFireAuth,
        public loadingCtrl: LoadingController,
        public _utilidadesPrv: UtilidadesProvider
    ) {}

    limpiarObjeto() {
        this.usuario = null;
        this.logout();
    }

    inicializarUsuario() {
        this.usuario = {
            idUsuario: 'aaa-bbb-890',
            nombres: 'Juan José',
            apellidos: 'González Pérez',
            email: 'test@test.com',
            telefono: '987654321',
            activo: true,
            nombreImagen: ''
        };
    }

    registrarUsuario(email: string, clave: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, clave)
                .then(resp => {
                    resolve(resp);
                }, err => {
                    reject(err);
                })
        });
    }

    login(email: string, clave: string) {
        let loader = this.loadingCtrl.create({
            content: "Validando usuario"
        });
        loader.present();

        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, clave)
                .then(resp => {
                    loader.dismiss();
                    resolve(resp);
                }, err => {
                    loader.dismiss();
                    reject(err);
                })
        });
    }

    getAuth() {
        return this.afAuth.authState.map(auth => auth);
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    estaLogueado(mostrarAlerta: boolean = true) {
        const estaLogueado: boolean = (this.usuario) ? true : false;

        if (mostrarAlerta) {
            if (!estaLogueado) {
                this._utilidadesPrv.mostrarAlerta({
                    titulo: 'Permiso denegado',
                    descripcion: 'No tiene permisos para visualizar la pantalla siguiente'
                });
            }
        }

        return estaLogueado;
    }

}
