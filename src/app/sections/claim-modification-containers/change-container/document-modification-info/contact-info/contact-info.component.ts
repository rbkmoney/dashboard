import { Component, Input } from '@angular/core';

import { ContactInfo } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-contact-info',
    templateUrl: 'contact-info.component.html'
})
export class ContactInfoComponent {
    @Input() contactInfo: ContactInfo;
}
