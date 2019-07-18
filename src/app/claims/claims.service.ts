import { Injectable } from '@angular/core';
import { switchMap, map, share } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import * as moment from 'moment';
import get from 'lodash.get';

import { genXRequestID } from '../api';
import {
    Claim,
    ClaimsService as APIClaimsService,
    ModificationUnit,
    Modification,
    DocumentModification,
    StatusModification,
    FileModification,
    CommentModification,
    ContractorModification,
    ContractModification
} from '../api/claim-management';
import { StatusColor } from '../theme-manager';
import { LocaleDictionaryService } from '../locale';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface ViewClaim extends Omit<Claim, 'createdAt' | 'updatedAt' | 'changeset'> {
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
    changeset: (Omit<ModificationUnit, 'createdAt'> & { createdAt: moment.Moment })[];
}

const claimStatuses = ['pending', 'pendingAcceptance', 'review', 'revoked', 'denied', 'accepted'] as const;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService, private localeDictionaryService: LocaleDictionaryService) {}

    toViewClaim(claim: Claim): ViewClaim {
        return {
            ...claim,
            updatedAt: moment(claim.updatedAt),
            createdAt: moment(claim.createdAt),
            changeset: claim.changeset.map(unit => ({
                ...unit,
                createdAt: moment(unit.createdAt)
            }))
        };
    }

    getClaims(count: number = 5, interval?: number): Observable<ViewClaim[]> {
        if (interval) {
            return timer(0, interval).pipe(
                switchMap(() => this.getClaims(count)),
                share()
            );
        }
        return this.claimsService.searchClaims(genXRequestID(), count).pipe(
            map(({ result }) => result.map(claim => this.toViewClaim(claim))),
            share()
        );
    }

    getClaim(claimID: number, interval?: number): Observable<ViewClaim> {
        if (interval) {
            return timer(0, interval).pipe(
                switchMap(() => this.getClaim(claimID)),
                share()
            );
        }
        return this.claimsService.getClaimByID(genXRequestID(), claimID).pipe(
            map(claim => this.toViewClaim(claim)),
            share()
        );
    }

    getClaimStatusColor(status: string): StatusColor {
        return {
            pending: StatusColor.pending,
            pendingAcceptance: StatusColor.pending,
            review: StatusColor.neutral,
            revoked: StatusColor.warn,
            denied: StatusColor.warn,
            accepted: StatusColor.success
        }[status];
    }

    getLocalizedClaimStatus(status: string): string {
        if (status) {
            return this.localeDictionaryService.mapDictionaryKey(`common.claim.status.${status}`);
        }
    }

    getModificationIcon(unit: ModificationUnit) {
        switch (unit.modification.modificationType) {
            case Modification.ModificationTypeEnum.ClaimModification:
                const modification = get(unit.modification, 'modification');
                if (modification) {
                    if (
                        (modification as DocumentModification).documentModificationType ===
                        DocumentModification.DocumentModificationTypeEnum.DocumentCreated
                    )
                        return 'add';
                    if (
                        (modification as StatusModification).statusModificationType ===
                        StatusModification.StatusModificationTypeEnum.StatusChanged
                    )
                        return 'insert_emoticon';
                    if (
                        (modification as FileModification).fileModificationType ===
                        FileModification.FileModificationTypeEnum.FileCreated
                    )
                        return 'attach_file';
                    if (
                        (modification as CommentModification).commentModificationType ===
                        CommentModification.CommentModificationTypeEnum.CommentCreated
                    )
                        return 'mode_comment';
                }
            case Modification.ModificationTypeEnum.PartyModification:
        }
        // return 'create';
    }

    getModificationColor(unit: ModificationUnit): StatusColor {
        switch (unit.modification.modificationType) {
            case Modification.ModificationTypeEnum.ClaimModification:
                const modification = get(unit.modification, 'modification');
                if (modification) {
                    if (
                        (modification as StatusModification).statusModificationType ===
                        StatusModification.StatusModificationTypeEnum.StatusChanged
                    )
                        return StatusColor.success;
                }
            case Modification.ModificationTypeEnum.PartyModification:
        }
    }

    getLocalizedModificationStatus(unit: ModificationUnit) {
        const modification = get(unit.modification, 'modification');
        switch (unit.modification.modificationType) {
            case Modification.ModificationTypeEnum.ClaimModification:
                if (modification) {
                    if (
                        (modification as DocumentModification).documentModificationType ===
                        DocumentModification.DocumentModificationTypeEnum.DocumentCreated
                    )
                        return 'создана анкета';
                    if (
                        (modification as StatusModification).statusModificationType ===
                        StatusModification.StatusModificationTypeEnum.StatusChanged
                    )
                        return 'изменен статус';
                    if (
                        (modification as FileModification).fileModificationType ===
                        FileModification.FileModificationTypeEnum.FileCreated
                    )
                        return 'добавлен файл';
                    if (
                        (modification as CommentModification).commentModificationType ===
                        CommentModification.CommentModificationTypeEnum.CommentCreated
                    )
                        return 'добавлен комментарий';
                }
                return 'обновлена заявка';
            case Modification.ModificationTypeEnum.PartyModification:
                if (modification) {
                    if (
                        (modification as ContractorModification).contractorModificationType ===
                        ContractorModification.ContractorModificationTypeEnum.Contractor
                    )
                        return 'обновлен контрагент';
                    if (
                        (modification as ContractModification).contractModificationType ===
                        ContractModification.ContractModificationTypeEnum.ContractParams
                    )
                        return 'обнавлен контракт';
                }
                return 'обновлен магазин';
        }
    }
}
