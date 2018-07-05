import { NgModule } from '@angular/core';
import { FechaCompletaPipe } from './fecha-completa/fecha-completa';
import { ImagenPipe } from './imagen/imagen';

@NgModule({
    declarations: [
        FechaCompletaPipe,
    ImagenPipe
    ],
    imports: [],
    exports: [
        FechaCompletaPipe,
    ImagenPipe
    ]
})
export class PipesModule {}
