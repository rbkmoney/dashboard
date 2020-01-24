import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ContactInfo } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-contact-info-sub-container',
    templateUrl: 'contact-info-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoSubContainerComponent {
    @Input() contactInfo: ContactInfo;
}
