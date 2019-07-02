import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {
    transform(value: number, predicate: any): string {
        return value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$& ')
            .replace('.', ', ');
    }
}
