import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dsh-legal-residency-info',
    templateUrl: 'legal-residency-info.component.html'
})
export class LegalResidencyInfoComponent {
    @Input() form: FormGroup;
}
