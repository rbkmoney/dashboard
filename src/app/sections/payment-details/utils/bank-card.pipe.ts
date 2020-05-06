import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bankCard'
})
export class BankCardPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/(.{4})/g, '$& ');
    }
}
