import { NgModule } from '@angular/core';
import { FechaCompletaPipe } from './fecha-completa/fecha-completa';
import { ImagenPipe } from './imagen/imagen';
import { MonedaPipe } from './moneda/moneda';

@NgModule({
    declarations: [
        FechaCompletaPipe,
        ImagenPipe,
        MonedaPipe
    ],
    imports: [],
    exports: [
        FechaCompletaPipe,
        ImagenPipe,
        MonedaPipe
    ]
})
export class PipesModule {}
