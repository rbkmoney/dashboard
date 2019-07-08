import { Pipe, PipeTransform } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {
    transform(value: number, symbol: string): string {
        return `${value} ${getCurrencySymbol(symbol, 'narrow')}`;
    }
}
