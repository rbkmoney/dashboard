import { Injectable } from '@angular/core';
import { Subject, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ConversationID } from '../../api-codegen/messages';
import { ReceiveClaimService } from './receive-claim.service';
import { ClaimsService, createCommentModificationUnit } from '../../api';
import { RouteParamClaimService } from './route-param-claim.service';

@Injectable()
export class UpdateClaimService {
    private updateByConversation$: Subject<ConversationID> = new Subject();

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private routeParamClaimService: RouteParamClaimService,
        private claimApiService: ClaimsService
    ) {
        this.updateByConversation$
            .pipe(
                switchMap(conversationID => combineLatest(of(conversationID), this.routeParamClaimService.claim$)),
                map(([conversationID, { id, revision }]) => ({
                    id,
                    revision,
                    changeset: [createCommentModificationUnit(conversationID)]
                })),
                switchMap(({ id, revision, changeset }) =>
                    this.claimApiService.updateClaimByID(id, revision, changeset)
                )
            )
            .subscribe(() => this.receiveClaimService.receiveClaim());
    }

    updateByConversation(id: ConversationID) {
        this.updateByConversation$.next(id);
    }
}
