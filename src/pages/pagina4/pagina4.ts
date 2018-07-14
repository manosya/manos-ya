import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'page-pagina4',
    templateUrl: 'pagina4.html'
})
export class Pagina4Page {
    items: any[];
    subscripcion: Subscription;

    constructor(
        public navCtrl: NavController,
        public afDB: AngularFireDatabase,
        public loadingCtrl: LoadingController,
        public _usuarioPrv: UsuarioProvider
    ) {}

    ionViewDidLoad() {
        let loader = this.loadingCtrl.create({
            content: "Obteniendo información"
        });
        loader.present();

        // this.items = afDB.list('/quiensoy').valueChanges();
        this.subscripcion = this.afDB.list('/quiensoy').valueChanges()
            .subscribe(resp => {
                loader.dismiss();
                this.items = resp;

                for (let i = 0; i < 300; i++) {
                    this.items.push(resp[0]);
                }


                console.log('datos obtenidos');
            }, err => {
                console.log(err);
            });
    }

    ionViewCanEnter() {
        return this._usuarioPrv.estaLogueado();
    }
    
    ionViewWillLeave() {
        console.log('unsubscribe');
        this.subscripcion.unsubscribe();
    }
}
