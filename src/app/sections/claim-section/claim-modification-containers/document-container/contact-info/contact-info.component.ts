import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContactInfo } from '@dsh/api-codegen/questionary';

@Component({
    selector: 'dsh-contact-info',
    templateUrl: 'contact-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {
    @Input() contactInfo: ContactInfo;
}
