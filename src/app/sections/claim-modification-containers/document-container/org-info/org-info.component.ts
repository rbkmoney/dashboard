import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import get from 'lodash.get';

import { OrgInfo } from './org-info';

@Component({
    selector: 'dsh-org-info',
    templateUrl: 'org-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgInfoComponent implements OnChanges {
    @Input() orgInfo: OrgInfo;

    registrationAddress: string;

    ngOnChanges({ orgInfo }: SimpleChanges) {
        this.registrationAddress = get(orgInfo, ['currentValue', 'registrationInfo', 'registrationAddress']);
    }
}
