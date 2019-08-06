import { Pipe, PipeTransform } from '@angular/core';
import isNil from 'lodash.isnil';
import round from 'lodash.round';

@Pipe({
    name: 'fromMinor'
})
export class FromMinorPipe implements PipeTransform {
    transform(amount: number): number {
        return isNil(amount) ? null : round(amount / 100, 2);
    }
}
