import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

import { Claim } from '../../../../../api-codegen/claim-management/swagger-codegen';
import { StatusColor } from '../../../../../theme-manager';
import { claimStatusToColor, ClaimType, getClaimType } from '../../../../../view-utils';

@Component({
    selector: 'dsh-claims-list-item',
    templateUrl: 'claims-list-item.component.html',
    styleUrls: ['claims-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsListItemComponent implements OnChanges {
    @Input() claim: Claim;

    @Output() menuItemSelected = new EventEmitter();

    type: ClaimType;
    statusColor: StatusColor;

    ngOnChanges({ claim }: SimpleChanges) {
        if (claim.isFirstChange || claim.currentValue.id !== claim.previousValue.id) {
            const { changeset, status } = claim.currentValue;
            this.type = getClaimType(changeset);
            this.statusColor = claimStatusToColor(status);
        }
    }
}
