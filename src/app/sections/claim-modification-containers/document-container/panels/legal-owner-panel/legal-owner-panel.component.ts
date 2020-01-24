import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LegalOwnerInfo } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-legal-owner-panel',
    templateUrl: 'legal-owner-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalOwnerPanelComponent {
    @Input() legalOwnerInfo: LegalOwnerInfo;
}
