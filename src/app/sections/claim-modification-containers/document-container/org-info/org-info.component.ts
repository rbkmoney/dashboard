import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { OrgInfo } from './org-info';

@Component({
    selector: 'dsh-org-info',
    templateUrl: 'org-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgInfoComponent {
    @Input() orgInfo: OrgInfo;
}
