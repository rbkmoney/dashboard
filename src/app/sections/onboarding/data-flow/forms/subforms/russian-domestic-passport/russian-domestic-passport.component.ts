import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-russian-domestic-passport',
    templateUrl: 'russian-domestic-passport.component.html'
})
export class RussianDomesticPassportComponent {
    layoutGap = '20px';

    @Input() form;
}
