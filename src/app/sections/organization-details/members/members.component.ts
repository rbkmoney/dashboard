import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';

import { FetchMembersService } from './services/fetch-members/fetch-members.service';
import { MembersExpandedIdManager } from './services/members-expanded-id-manager/members-expanded-id-manager.service';

@UntilDestroy()
@Component({
    selector: 'dsh-members',
    templateUrl: 'members.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchMembersService, MembersExpandedIdManager],
})
export class MembersComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        untilDestroyed(this),
        shareReplay(1)
    );
    members$ = this.fetchMembersService.members$;
    lastUpdated$ = this.fetchMembersService.lastUpdated$;
    isLoading$ = this.fetchMembersService.isLoading$;

    constructor(
        private organizationsService: OrganizationsService,
        private fetchMembersService: FetchMembersService,
        private route: ActivatedRoute
    ) {}

    refresh() {
        this.fetchMembersService.load();
    }
}
