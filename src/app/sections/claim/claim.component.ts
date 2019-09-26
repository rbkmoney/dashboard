import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { ClaimService } from './claim.service';

@Component({
    selector: 'dsh-claim',
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss'],
    providers: [ClaimService]
})
export class ClaimComponent {
    links = [
        {
            path: 'conversation'
        },
        {
            path: 'changes'
        },
        {
            path: 'documents'
        }
    ];

    claimID$ = this.claimService.claim$.pipe(map(({ id }) => id));
    claimStatusViewInfo$ = this.claimService.claimStatusViewInfo$;

    constructor(private claimService: ClaimService) {}
}
