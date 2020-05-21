import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amount',
})
export class AmountPipe implements PipeTransform {
    transform(value: number): string {
        return value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$& ')
            .replace('.', ', ');
    }
}
