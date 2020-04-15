import { Pipe, PipeTransform } from '@angular/core';
import isNil from 'lodash.isnil';
import round from 'lodash.round';

export const fromMinor = (amount: number): number => (isNil(amount) ? null : round(amount / 100, 2));

@Pipe({
    name: 'fromMinor'
})
export class FromMinorPipe implements PipeTransform {
    transform(amount: number): number {
        return fromMinor(amount);
    }
}
