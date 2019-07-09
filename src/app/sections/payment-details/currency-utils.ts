import { getCurrencySymbol } from '@angular/common';

export function toCurrencySymbol(code: string): string {
    return getCurrencySymbol(code, 'narrow');
}
