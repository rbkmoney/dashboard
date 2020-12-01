import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { LAYOUT_GAP } from '../constants';
import { ClaimSearchFormValue } from './search-form';
import { ClaimsExpandedIdManagerService } from './services/claims-expanded-id-manager/claims-expanded-id-manager.service';
import { FetchClaimsService } from './services/fetch-claims.service';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [FetchClaimsService, ClaimsExpandedIdManagerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent {
    claimsList$ = this.fetchClaimsService.searchResult$;
    isLoading$ = this.fetchClaimsService.isLoading$;
    lastUpdated$ = this.fetchClaimsService.lastUpdated$;
    hasMore$ = this.fetchClaimsService.hasMore$;
    expandedId$ = this.claimsExpandedIdManagerService.expandedId$;

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private fetchClaimsService: FetchClaimsService,
        private claimsExpandedIdManagerService: ClaimsExpandedIdManagerService
    ) {}

    search(val: ClaimSearchFormValue) {
        this.fetchClaimsService.search(val);
    }

    fetchMore() {
        this.fetchClaimsService.fetchMore();
    }

    refresh() {
        this.fetchClaimsService.refresh();
    }

    expandedIdChange(id: number) {
        this.claimsExpandedIdManagerService.expandedIdChange(id);
    }
}
