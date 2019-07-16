import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatPercent'
})
export class FormatPercentPipe implements PipeTransform {
    transform(value: number): string {
        return value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$& ')
            .replace('.', ', ');
    }
}
