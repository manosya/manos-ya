import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuComponent } from './menu/menu';
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
	declarations: [MenuComponent],
	imports: [
        IonicPageModule,
        PipesModule
    ],
	exports: [MenuComponent]
})
export class ComponentsModule {}
