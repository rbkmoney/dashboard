import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dsh-individual-residency-info',
    templateUrl: 'individual-residency-info.component.html',
})
export class IndividualResidencyInfoComponent {
    @Input() form: FormGroup;
}
