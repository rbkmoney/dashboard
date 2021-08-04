import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Invitation } from '@dsh/api-codegen/organizations';
import { ExpandedIdManager } from '@dsh/app/shared/services';

import { FetchInvitationsService } from '../fetch-invitations/fetch-invitations.service';

@Injectable()
export class InvitationsExpandedIdManager extends ExpandedIdManager<Invitation> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchInvitationsService: FetchInvitationsService
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Invitation[]> {
        return this.fetchInvitationsService.invitations$;
    }
}
