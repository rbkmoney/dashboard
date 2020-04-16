import { Pipe, PipeTransform } from '@angular/core';

import { fromMinor } from '../../utils/from-minor';

@Pipe({
    name: 'fromMinor'
})
export class FromMinorPipe implements PipeTransform {
    transform(amount: number): number {
        return fromMinor(amount);
    }
}
