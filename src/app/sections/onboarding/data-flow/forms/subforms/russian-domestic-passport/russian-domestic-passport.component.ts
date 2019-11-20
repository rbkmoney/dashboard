import { Component, Input } from '@angular/core';

import { seriesNumberMask } from '../../../../../../form-controls';

@Component({
    selector: 'dsh-russian-domestic-passport',
    templateUrl: 'russian-domestic-passport.component.html'
})
export class RussianDomesticPassportComponent {
    layoutGap = '20px';

    seriesNumberMask = seriesNumberMask;

    @Input() form;
}
