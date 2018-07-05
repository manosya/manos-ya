import { Component } from '@angular/core';
import { LoginPage } from '../../pages/pages.index';

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    text: string;
    rootPage: any = LoginPage;
    
    constructor() {
        console.log('Hello MenuComponent Component');
        this.text = 'Hello World';
    }
}
