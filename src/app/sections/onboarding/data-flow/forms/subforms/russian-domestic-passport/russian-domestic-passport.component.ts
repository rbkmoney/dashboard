import { Component, Input, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-russian-domestic-passport',
    templateUrl: 'russian-domestic-passport.component.html'
})
export class RussianDomesticPassportComponent {
    @Input() form: FormGroup;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
