import { NgModule } from '@angular/core';
import { FechaCompletaPipe } from './fecha-completa/fecha-completa';

@NgModule({
    declarations: [
        FechaCompletaPipe
    ],
    imports: [],
    exports: [
        FechaCompletaPipe
    ]
})
export class PipesModule {}
