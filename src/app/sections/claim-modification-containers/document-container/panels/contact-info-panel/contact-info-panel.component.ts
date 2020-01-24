import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ContactInfo } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-contact-info-panel',
    templateUrl: 'contact-info-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoPanelComponent {
    @Input() contactInfo: ContactInfo;
}
