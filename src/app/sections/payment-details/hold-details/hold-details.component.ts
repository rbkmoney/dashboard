import { Component, Input } from '@angular/core';
import template from 'lodash.template';

import { LocaleDictionaryService } from '../../../locale/locale-dictionary';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html'
})
export class HoldDetailsComponent {
    @Input() holdDate: string;

    @Input() layoutGap = '20px';

    template = template;

    localePath = 'sections.paymentDetails.holdDetails';

    constructor(private localeDictionaryService: LocaleDictionaryService) {}
}
