import { Pipe, PipeTransform } from '@angular/core';
// import { CONSTANTES } from '../../providers/constantes/constantes';

@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
    transform(imagen: string): string {
        // si no existe imagen, entonces retorna imagen por defecto
        if (!imagen) {
            return 'assets/img/profile.png';
        }

        // si la imagen es base64, retorna la misma
        if (imagen.indexOf('data:image') >= 0) {
            return imagen;
        }

        // si tiene el nombre de la imagen, entonces construye url de Azure
        // return CONSTANTES.URL_BLOB_IMAGENES_PERSONAS + '/' + imagen;
    }
}
