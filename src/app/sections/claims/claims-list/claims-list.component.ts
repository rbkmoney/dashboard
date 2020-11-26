import { Component, EventEmitter, Input, Output } from '@angular/core';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';

import { ClaimsExpandedIdManagerService } from './services/claims-expanded-id-manager/claims-expanded-id-manager.service';

@Component({
    selector: 'dsh-claims-list',
    templateUrl: 'claims-list.component.html',
    providers: [ClaimsExpandedIdManagerService],
})
export class ClaimsListComponent {
    @Input() claimList: any[];
    @Input() lastUpdated: string;
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;

    @Output() refresh = new EventEmitter<void>();
    @Output() showMore = new EventEmitter<void>();

    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;

    constructor(private expandedIdManager: ClaimsExpandedIdManagerService) {}

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

    expandedIdChange(id: number) {
        this.expandedIdManager.expandedIdChange(id);
    }
}
