import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTES } from '../../providers/constantes/constantes';

@Pipe({
  name: 'fechaCompleta',
})
export class FechaCompletaPipe implements PipeTransform {
    transform(fecha: Date) {
        const mes = fecha.getMonth();
        const diaMes = fecha.getDate();
        const diaSemana = fecha.getDay();
        const anio = fecha.getFullYear();
        const dias = CONSTANTES.DIAS_SEMANA;
        const meses = CONSTANTES.MESES;
        
        return `${ dias[diaSemana] }, ${ diaMes } de ${ meses[mes] } del ${ anio }`;
    }
}
