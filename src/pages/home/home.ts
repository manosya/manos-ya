import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    items: any[];

    constructor(
        public navCtrl: NavController,
        public afDB: AngularFireDatabase
    ) {}

    ionViewDidLoad() {
        // this.items = afDB.list('/quiensoy').valueChanges();
        this.afDB.list('/quiensoy').valueChanges()
            .subscribe(resp => {
                this.items = resp;
                console.log(this.items);
            }, err => {
                console.log(err);
            });
    }
    
}
