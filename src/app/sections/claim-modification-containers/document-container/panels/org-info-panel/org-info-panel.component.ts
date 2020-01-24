import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { OrgInfo } from '../../document-container.service';

@Component({
    selector: 'dsh-org-info-panel',
    templateUrl: 'org-info-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgInfoPanelComponent {
    @Input() orgInfo: OrgInfo;
}
