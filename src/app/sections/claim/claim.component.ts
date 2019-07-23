import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

import { ClaimService } from './claim.service';
import { ViewClaim, ClaimsService } from '../../claims';

@Component({
    selector: 'dsh-claim',
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss']
})
export class ClaimComponent {
    links$ = this.claim$.pipe(
        map(({ id }) => {
            const getPath = (p: string) => `/claim/${id}/${p}`;
            return [
                {
                    path: getPath('conversation'),
                    label: 'sections.claim.conversation.label'
                },
                {
                    path: getPath('changes'),
                    label: 'sections.claim.changes.label'
                },
                {
                    path: getPath('documents'),
                    label: 'sections.claim.documents.label'
                }
            ];
        }),
        shareReplay(1)
    );

    get claim$(): Observable<ViewClaim> {
        return this.claimService.claim$;
    }

    constructor(private claimService: ClaimService, public claimsService: ClaimsService, public router: Router) {}
}
