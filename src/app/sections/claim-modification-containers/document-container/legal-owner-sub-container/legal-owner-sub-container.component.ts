import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LegalOwnerInfo } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-legal-owner-sub-container',
    templateUrl: 'legal-owner-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalOwnerSubContainerComponent {
    @Input() legalOwnerInfo: LegalOwnerInfo;
}
