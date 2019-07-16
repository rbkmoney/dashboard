import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatBankCard'
})
export class FormatBankCardPipe implements PipeTransform {
    transform (value: string): string {
        return value.replace(/(.{4})/g, '$& ');
    }
}
