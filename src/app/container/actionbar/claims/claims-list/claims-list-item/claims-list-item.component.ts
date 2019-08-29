import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Claim } from '../../../../../api-codegen/claim-management/swagger-codegen';
import { ClaimsListItemService, ClaimListItem } from './claims-list-item.service';

@Component({
    selector: 'dsh-claims-list-item',
    templateUrl: 'claims-list-item.component.html',
    styleUrls: ['claims-list-item.component.scss'],
    providers: [ClaimsListItemService]
})
export class ClaimsListItemComponent implements OnChanges {
    @Input() claim: Claim;

    @Output() menuItemSelected = new EventEmitter();

    listItem: ClaimListItem;

    constructor(private listItemService: ClaimsListItemService) {}

    ngOnChanges({ claim }: SimpleChanges) {
        if (this.listItemService.isNeedToUpdate(claim)) {
            this.listItem = this.listItemService.toClaimListItem(claim.currentValue);
        }
    }
}
