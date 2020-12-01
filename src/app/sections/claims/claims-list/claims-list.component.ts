import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import isNil from 'lodash.isnil';

import { Claim } from '../../../api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claims-list',
    templateUrl: 'claims-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsListComponent {
    @Input() claimList: Claim[];
    @Input() lastUpdated: string;
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() refresh = new EventEmitter<void>();
    @Output() showMore = new EventEmitter<void>();
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();

    get isListExist(): boolean {
        return !isNil(this.claimList);
    }

    get isEmptyList(): boolean {
        return this.isListExist && this.claimList.length === 0;
    }

    constructor(private router: Router) {}

    refreshList(): void {
        this.refresh.emit();
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    goToClaimDetails({ id }: Claim) {
        this.router.navigate(['claim', id]);
    }
}
