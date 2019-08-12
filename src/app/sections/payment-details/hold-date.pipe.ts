import { Pipe, PipeTransform } from '@angular/core';
import template from 'lodash.template';

import { LocaleDictionaryService } from '../../locale/locale-dictionary';

@Pipe({
    name: 'holdDatePipe'
})
export class HoldDatePipe implements PipeTransform {
    constructor(private localeDictionaryService: LocaleDictionaryService) {}

    transform(holdDate: string): string {
        return template(this.localeDictionaryService.mapDictionaryKey('sections.paymentDetails.holdDetails.holdDate'))({
            holdDate
        });
    }
}
