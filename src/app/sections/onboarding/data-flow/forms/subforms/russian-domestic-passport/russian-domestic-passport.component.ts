import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LAYOUT_GAP } from '../../../../../tokens';

@Component({
    selector: 'dsh-russian-domestic-passport',
    templateUrl: 'russian-domestic-passport.component.html',
})
export class RussianDomesticPassportComponent {
    @Input() form: FormGroup;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
