import * as moment from 'moment';
import get from 'lodash.get';

import {
    Claim,
    ModificationUnit,
    Modification,
    DocumentModification,
    StatusModification,
    FileModification,
    CommentModification,
    ContractorModification,
    ContractModification,
    StatusModificationUnit
} from '../api/claim-management';
import { StatusColor } from '../theme-manager';

export class ViewModificationUnit {
    get createdAt() {
        return moment(this.base.createdAt);
    }
    get icon(): string {
        return this.getExtensions().icon;
    }
    get label(): string {
        return this.getExtensions().label;
    }
    get color(): StatusColor {
        return this.getExtensions().color;
    }

    constructor(public readonly base: ModificationUnit) {}

    getExtensions(base: ModificationUnit = this.base) {
        const getLabel = (label: string) => `common.claim.modification.label.${label}`;
        const modification = get(base.modification, 'modification');
        switch (base.modification.modificationType) {
            case Modification.ModificationTypeEnum.ClaimModification: {
                if (modification) {
                    if (
                        (modification as DocumentModification).documentModificationType ===
                        DocumentModification.DocumentModificationTypeEnum.DocumentCreated
                    )
                        return { icon: 'add', label: getLabel('documentCreated') };
                    if (
                        (modification as StatusModification).statusModificationType ===
                        StatusModification.StatusModificationTypeEnum.StatusChanged
                    ) {
                        const unitModification = base.modification as StatusModificationUnit;
                        if (unitModification.status === StatusModificationUnit.StatusEnum.Accepted) {
                            return {
                                icon: 'insert_emoticon',
                                label: getLabel('statusChanged'),
                                color: StatusColor.success
                            };
                        }
                    }
                    if (
                        (modification as FileModification).fileModificationType ===
                        FileModification.FileModificationTypeEnum.FileCreated
                    )
                        return { icon: 'attach_file', label: getLabel('fileCreated') };
                    if (
                        (modification as CommentModification).commentModificationType ===
                        CommentModification.CommentModificationTypeEnum.CommentCreated
                    ) {
                        return { icon: 'mode_comment', label: getLabel('commentCreated') };
                    }
                }
                return { label: getLabel('claimUpdated') };
            }
            case Modification.ModificationTypeEnum.PartyModification: {
                if (modification) {
                    if (
                        (modification as ContractorModification).contractorModificationType ===
                        ContractorModification.ContractorModificationTypeEnum.Contractor
                    )
                        return { label: getLabel('contractorUpdated') };
                    if (
                        (modification as ContractModification).contractModificationType ===
                        ContractModification.ContractModificationTypeEnum.ContractParams
                    )
                        return { label: getLabel('contractUpdated') };
                }
                return { label: getLabel('shopUpdated'), icon: 'create' };
            }
            default: {
                console.error('Modification unidentified');
                return { label: getLabel('updated') };
            }
        }
    }
}

export class ViewClaim {
    get id() {
        return this.base.id;
    }
    get createdAt(): moment.Moment {
        return moment(this.base.createdAt);
    }
    get updatedAt(): moment.Moment {
        return moment(this.base.updatedAt);
    }
    get changeset(): ViewModificationUnit[] {
        return this.base.changeset.map(unit => new ViewModificationUnit(unit));
    }
    get status(): string {
        return `common.claim.status.${this.base.status}`;
    }
    get color(): StatusColor {
        return {
            pending: StatusColor.pending,
            pendingAcceptance: StatusColor.pending,
            review: StatusColor.neutral,
            revoked: StatusColor.warn,
            denied: StatusColor.warn,
            accepted: StatusColor.success
        }[status];
    }

    constructor(public readonly base: Claim) {}
}
