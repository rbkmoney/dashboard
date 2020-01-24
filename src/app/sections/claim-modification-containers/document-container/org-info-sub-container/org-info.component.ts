import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { OrgInfo } from '../document-container.service';

@Component({
    selector: 'dsh-org-info',
    templateUrl: 'org-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgInfoSubContainerComponent {
    @Input() orgInfo: OrgInfo;
}
