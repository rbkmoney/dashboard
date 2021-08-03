import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dsh-russian-domestic-passport',
    templateUrl: 'russian-domestic-passport.component.html',
})
export class RussianDomesticPassportComponent {
    @Input() form: FormGroup;
}
