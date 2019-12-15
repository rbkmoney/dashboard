import { Injectable } from '@angular/core';
import { Subject, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ConversationID } from '../../api-codegen/messages';
import { ReceiveClaimService } from './receive-claim.service';
import { ClaimsService, createCommentModificationUnit, createFileModificationUnit } from '../../api';
import { RouteParamClaimService } from './route-param-claim.service';

interface UpdateParams {
    type: 'updateConversation' | 'updateFiles';
}

interface UpdateConversationParams extends UpdateParams {
    conversationId: ConversationID;
}

interface UpdateFilesParams extends UpdateParams {
    fileIds: string[];
}

const isUpdateConversation = (p: UpdateParams): p is UpdateConversationParams => p.type === 'updateConversation';
const isUpdateFiles = (p: UpdateParams): p is UpdateFilesParams => p.type === 'updateFiles';

@Injectable()
export class UpdateClaimService {
    private updateBy$: Subject<UpdateParams> = new Subject();

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private routeParamClaimService: RouteParamClaimService,
        private claimApiService: ClaimsService
    ) {
        this.updateBy$
            .pipe(
                map(params => {
                    if (isUpdateConversation(params)) {
                        return [createCommentModificationUnit(params.conversationId)];
                    }
                    if (isUpdateFiles(params)) {
                        return params.fileIds.map(createFileModificationUnit);
                    }
                    throw new Error('Unknown update claim params');
                }),
                switchMap(changeset => combineLatest(of(changeset), this.routeParamClaimService.claim$)),
                map(([changeset, { id, revision }]) => ({
                    id,
                    revision,
                    changeset
                })),
                switchMap(({ id, revision, changeset }) =>
                    this.claimApiService.updateClaimByID(id, revision, changeset)
                )
            )
            .subscribe(() => this.receiveClaimService.receiveClaim());
    }

    updateByConversation(conversationId: ConversationID) {
        this.updateBy$.next({
            type: 'updateConversation',
            conversationId
        } as UpdateConversationParams);
    }

    updateByFiles(fileIds: string[]) {
        this.updateBy$.next({
            type: 'updateFiles',
            fileIds
        } as UpdateFilesParams);
    }
}
