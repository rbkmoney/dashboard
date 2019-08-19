import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
    transform(number: string): string {
        return number;
    }
}
