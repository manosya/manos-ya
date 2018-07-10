import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'moneda'
})
export class MonedaPipe implements PipeTransform {
    transform(valor: number) {
        if (!valor || valor === undefined ) {
            return valor;
        }

        let num: string = valor.toString().replace(/\./g,'');
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
        return '$' + num;
        
    }

}
