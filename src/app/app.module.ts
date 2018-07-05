import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Plugins
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';

// Modulos
import { PipesModule } from './../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

// Servicios
import { UtilidadesProvider } from '../providers/utilidades/utilidades';

// Componentes
import { MyApp } from './app.component';
import {
    HomePage,
    LoginPage
} from '../pages/pages.index';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        PipesModule,
        ComponentsModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            dayShortNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        StatusBar,
        SplashScreen,
        Network,
        AppVersion,
        UtilidadesProvider
    ]
})
export class AppModule {}