import { Component, ViewChild } from '@angular/core';
import { Nav, ModalController, AlertController } from 'ionic-angular';
import { IUsuario, IPagina } from '../../interfaces/interfaces';
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage, HomePage, Pagina1Page, Pagina2Page, PaginaModalPage, Pagina4Page } from '../../pages/pages.index';

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    usuario: IUsuario;
    paginas: Array<IPagina>;
    fechaActual: Date = new Date();
    versionNumero: string;
    
    constructor(
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public _utilidadesPrv: UtilidadesProvider,
        public _usuarioPrv: UsuarioProvider
    ) {
        // listado de paginas que se muestran en el sidemenu
        this.paginas = [
            { titulo: 'Mi Home', icono: 'ios-home', componente: HomePage },
            { titulo: 'Página 1', icono: 'md-time', componente: Pagina1Page },
            { titulo: 'Página 2', icono: 'md-help-circle', componente: Pagina2Page },
            { titulo: 'divider', icono: '', componente: null },
            { titulo: 'Página 3 - VirtualScroll', icono: 'md-help-circle', componente: Pagina4Page },
            { titulo: 'Página Modal', icono: 'md-key', componente: PaginaModalPage }
        ];

        // se suscribe al evento cuando cambia la propiedad 'usuario' del servicio
        this._usuarioPrv.notificarCambio
            .subscribe(resp => {
                this.usuario = this._usuarioPrv.usuario;
            });

        this._utilidadesPrv.obtenerVersionAplicacion()
            .then((resp: any) => {
                this.versionNumero = resp;
            });
    }

    abrirPagina(pagina: any) {
        if (pagina.componente === PaginaModalPage) {
            const modal = this.modalCtrl.create(PaginaModalPage);
            modal.present();
        } else {
            // Restablece el contenido de navegación para tener solo esta página
            // no queremos que el botón Atrás se muestre en este escenario
            this.nav.setRoot(pagina.componente);
        }
    }

    cerrarSesion() {
        const confirm = this.alertCtrl.create({
            title: 'Cerrar sesión',
            message: '¿Está seguro que desea salir de la aplicación?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        // no hace nada
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.matarObjetos();
                        this.nav.setRoot(LoginPage);
                    }
                }
            ]
        });

        confirm.present();
    }

    abrirModal() {
        const modal = this.modalCtrl.create(PaginaModalPage);
        modal.present();
    }

    matarObjetos() {
        this._usuarioPrv.limpiarObjeto();
    }    
}
