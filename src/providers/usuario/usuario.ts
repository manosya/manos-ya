import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { IUsuario } from './../../interfaces/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Injectable()
export class UsuarioProvider {
    usuario: IUsuario = null;
    notificarCambio = new EventEmitter<any>();

    constructor(
        public http: HttpClient,
        public afAuth: AngularFireAuth
    ) {}

    limpiarObjeto() {
        this.usuario = null;
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
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, clave)
                .then(resp => {
                    resolve(resp);
                }, err => {
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

}
