import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { IUsuario } from './../../interfaces/interfaces';

@Injectable()
export class UsuarioProvider {
    usuario: IUsuario = null;
    notificarCambio = new EventEmitter<any>();

    constructor(public http: HttpClient) {
        console.log('Hello UsuarioProvider Provider');
    }

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
}
