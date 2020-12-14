import { Pipe, PipeTransform } from '@angular/core';

import { toMajor } from '../../../../utils';

@Pipe({
    name: 'toMajor',
})
export class ToMajorPipe implements PipeTransform {
    transform(amount: number): number {
        return toMajor(amount);
    }
}
