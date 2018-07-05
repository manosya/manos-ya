import { FormControl, FormGroup } from '@angular/forms';

export class MiValidador {
    private validarExpresionRegular(expresion: string, valor: string) {
        const regx = new RegExp(expresion);
        return regx.test(valor);
    }

    static email(control: FormControl): { [key: string]: boolean } {
        let miValidador = new MiValidador();
        let esValido: boolean = false;
        const regx = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';

        //si no es valido retorna el objeto, sino null
        esValido = miValidador.validarExpresionRegular(regx, control.value);
        return !esValido ? { email: true } : null;
    }

    static rut(control: FormControl): { [s: string]: boolean } {
        let esValido: boolean = false;

        const verificaDV = function(iRut: string) {
            let digit: number;
            let ind: number;
            let lar: number;
            let suma: number;
            let rutAux: string;
            let digCal: string;
            let fac: string;

            digCal = '';
            rutAux = iRut;
            lar = rutAux.length;
            if (lar < 9) {
                const cad = '000000000';
                rutAux = cad.substr(1, 9 - lar) + rutAux;
            }
            fac = '432765432';
            suma = 0;
            ind = 9;
            while (ind > 1) {
                const pa = rutAux.substr(ind - 1, 1);
                const pb = fac.substr(ind - 1, 1);
                suma =
                    parseFloat(suma.toString()) +
                    parseFloat(pa) * parseFloat(pb);
                ind = ind - 1;
            }
            digit = 11 - (suma - parseInt((suma / 11).toString()) * 11);

            if (digit == 10) {
                digCal = 'K';
            }

            if (digit != 10) {
                if (digit == 11) {
                    digCal = '0';
                }

                if (digit != 11) {
                    digCal = digit.toString();
                }
            }

            if (isNaN(parseInt(digCal)) && digCal != 'K') {
                digCal = '';
            }
            return digCal;
        };

        //se quita espacios, puntos y guión
        const er = new RegExp(/ |-|\./gi);
        const rut = control.value.replace(er, '');

        //valida que el largo del rut sea de 9 digitos, incluyendo el digito Verificador
        if (rut.length > 9) {
            esValido = false;
        } else {
            let dv = rut.substring(rut.length - 1, rut.length);
            if (isNaN(dv)) {
                dv = dv.toUpperCase();
            }
            const parteNumerica = rut.substring(0, rut.length - 1);

            if (verificaDV(parteNumerica) == dv) {
                esValido = true;
            } else {
                esValido = false;
            }
        }

        //si no es valido retorna el objeto, sino null
        return !esValido ? { rut: true } : null;
    }

    static coincidenClaves(nuevaClaveKey: string, repetirClaveKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let nuevaClave = group.controls[nuevaClaveKey];
            let repetirClave = group.controls[repetirClaveKey];

            if (nuevaClave.value !== repetirClave.value) {
                return {
                    noIguales: true
                };
            } else {
                return null;
            }
        };
    }
}
