import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-legal-residency-info',
    templateUrl: 'legal-residency-info.component.html'
})
export class LegalResidencyInfoComponent {
    @Input() form;
}
