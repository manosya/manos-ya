import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../pages.index';
import { MiValidador } from './../../providers/mi-validador/mi-validador';
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    frmLogin: FormGroup;
    tieneErrores: boolean = false;
    versionNumero: string;
    email: string = '';
    clave: string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public formBuilder: FormBuilder,
        public _utilidadesPrv: UtilidadesProvider,
        public _usuarioPrv: UsuarioProvider
    ) {
        // inicia los campos que se van a manejar desde el formulario html
        this.frmLogin = this.formBuilder.group({
            email: ['', [Validators.required, MiValidador.email]],
            clave: ['', Validators.required]
        });
    }

    // TODO *** eliminar
    llenarFormulario() {
        this.email = 'test@test.com';
        this.clave = '123456';
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ionViewDidEnter() {
        // el menú raíz de la izquierda se deshabilita cuando ingresa a esta pantalla
        this.menuCtrl.enable(false);
        this._utilidadesPrv.obtenerVersionAplicacion().then((resp: any) => {
            this.versionNumero = resp;
        });
    }

    ionViewWillLeave() {
        // el menú raíz de la izquierda se habilita cuando se cambia de esta pantalla
        this.menuCtrl.enable(true);
    }

    ingresar() {
        const ERROR_USERNAME: string = 'auth/user-not-found';
        const ERROR_PASSWORD: string = 'auth/wrong-password';

        // verifica los datos del formulario
        this.tieneErrores = this.frmLogin.invalid;

        // si tiene errores el formulario, detiene el proceso
        if (this.tieneErrores) {
            this._utilidadesPrv.mostrarAlertaDatosInvalidos();
            return;
        }

        // si no tiene internet entonces detiene el proceso
        if (!this._utilidadesPrv.tieneInternet) {
            this._utilidadesPrv.mostrarAlertaSinInternet();
            return;
        }

        // datos correctos, continua
        const formData: any = this.frmLogin.value;
        const email: string = formData.email;
        const clave: string = formData.clave;

        // TODO *** CREAR METODO LOGIN PARA SUSCRIBIRSE
        // accede al Dashboard
        this._usuarioPrv.login(email, clave)
            .then(resp => {
                // si respuesta es exitosa entonces continua
                // this._usuarioPrv.usuario = resp.Datos;
                this._usuarioPrv.inicializarUsuario(); // todo *** eliminar este metodo depsues que este implementado el login
                this._usuarioPrv.notificarCambio.emit(true);
                this.navCtrl.setRoot(HomePage);        
            })
            .catch(err => {
                if (err.code === ERROR_PASSWORD || err.code === ERROR_USERNAME) {
                    this._utilidadesPrv.mostrarAlerta({
                        titulo: 'Acceso denegado',
                        descripcion: 'Email o clave no corresponden'
                    });
                } else {
                    this._utilidadesPrv.mostrarAlerta({
                        titulo: 'Error de servidor',
                        descripcion: `Se produjo un error desconocido, y no podemos procesar su solicitud.<br>[code: ${ err.code }]`
                    });
                }
            });

    }
}
