import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import isNil from 'lodash-es/isNil';

import { Claim } from '@dsh/api-codegen/claim-management/swagger-codegen';

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
    @Output() goToClaimDetails: EventEmitter<number> = new EventEmitter();

    get isListExist(): boolean {
        return !isNil(this.claimList);
    }

    get isEmptyList(): boolean {
        return this.isListExist && this.claimList.length === 0;
    }

    refreshList(): void {
        this.refresh.emit();
    }

    showMoreElements(): void {
        this.showMore.emit();
    }
}
