import { getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencySymbol',
})
export class CurrencySymbolPipe implements PipeTransform {
    transform(code: string): string {
        return getCurrencySymbol(code, 'narrow');
    }
}
