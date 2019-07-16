import { Pipe, PipeTransform } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {
    transform (code: string): string {
        return getCurrencySymbol(code, 'narrow');
    }
}
