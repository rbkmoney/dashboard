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
    StatusModificationUnit,
    ClaimModification,
    DocumentModificationUnit,
    FileModificationUnit,
    CommentModificationUnit,
    PartyModification,
    ContractorModificationUnit,
    ContractModificationUnit
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

    isTypedModification<M extends Modification>(
        base: ModificationUnit,
        type: Modification.ModificationTypeEnum
    ): base is ModificationUnit & { modification: M } {
        return !!(base && base.modification && base.modification.modificationType === type);
    }

    isTypedClaimModificationUnit<M extends ClaimModification & { modification: any }>(
        base: ModificationUnit & { modification: ClaimModification },
        modificationType: keyof M['modification']
    ): base is ModificationUnit & { modification: M } {
        return !!(base.modification && (base.modification as M).modification[modificationType]);
    }

    isTypedPartyModificationUnit<M extends PartyModification & { modification: any }>(
        base: ModificationUnit & { modification: PartyModification },
        modificationType: keyof M['modification']
    ): base is ModificationUnit & { modification: M } {
        return !!(base.modification && (base.modification as M).modification[modificationType]);
    }

    getExtensions(base: ModificationUnit = this.base): { label: string; icon?: string; color?: StatusColor } {
        const getLabel = (label: string) => `common.claim.modification.label.${label}`;
        if (this.isTypedModification<ClaimModification>(base, 'ClaimModification')) {
            if (this.isTypedClaimModificationUnit<DocumentModificationUnit>(base, 'documentModificationType')) {
                switch (base.modification.modification.documentModificationType) {
                    case DocumentModification.DocumentModificationTypeEnum.DocumentCreated:
                        return { icon: 'add', label: getLabel('documentCreated') };
                }
            } else if (this.isTypedClaimModificationUnit<StatusModificationUnit>(base, 'statusModificationType')) {
                switch (base.modification.modification.statusModificationType) {
                    case StatusModification.StatusModificationTypeEnum.StatusChanged:
                        return {
                            icon: 'insert_emoticon',
                            label: getLabel('statusChanged'),
                            color: StatusColor.success
                        };
                }
            } else if (this.isTypedClaimModificationUnit<FileModificationUnit>(base, 'fileModificationType')) {
                switch (base.modification.modification.fileModificationType) {
                    case FileModification.FileModificationTypeEnum.FileCreated:
                        return { icon: 'attach_file', label: getLabel('fileCreated') };
                }
            } else if (this.isTypedClaimModificationUnit<CommentModificationUnit>(base, 'commentModificationType')) {
                switch (base.modification.modification.commentModificationType) {
                    case CommentModification.CommentModificationTypeEnum.CommentCreated:
                        return { icon: 'mode_comment', label: getLabel('commentCreated') };
                }
            }
            console.error('Claim modification unidentified');
            return { label: getLabel('claimUpdated') };
        } else if (this.isTypedModification<PartyModification>(base, 'PartyModification')) {
            const icon = 'create';
            if (this.isTypedPartyModificationUnit<ContractorModificationUnit>(base, 'contractorModificationType')) {
                switch (base.modification.modification.contractorModificationType) {
                    case ContractorModification.ContractorModificationTypeEnum.Contractor:
                        return { icon, label: getLabel('contractorUpdated') };
                }
            } else if (this.isTypedPartyModificationUnit<ContractModificationUnit>(base, 'contractModificationType')) {
                switch (base.modification.modification.contractModificationType) {
                    case ContractModification.ContractModificationTypeEnum.ContractAdjustmentModificationUnit:
                        return { icon, label: getLabel('contractUpdated') };
                    case ContractModification.ContractModificationTypeEnum.ContractParams:
                        return { icon, label: getLabel('contractUpdated') };
                    case ContractModification.ContractModificationTypeEnum.ContractTermination:
                        return { icon, label: getLabel('contractUpdated') };
                    case ContractModification.ContractModificationTypeEnum.ContractorID:
                        return { icon, label: getLabel('contractUpdated') };
                    case ContractModification.ContractModificationTypeEnum.LegalAgreement:
                        return { icon, label: getLabel('contractUpdated') };
                    case ContractModification.ContractModificationTypeEnum.PayoutToolModificationUnit:
                        return { icon, label: getLabel('contractUpdated') };
                    case ContractModification.ContractModificationTypeEnum.ReportPreferences:
                        return { icon, label: getLabel('contractUpdated') };
                }
            }
            // TODO: ShopModificationUnit
            console.error('Shop modification unidentified');
            return { label: getLabel('shopUpdated'), icon };
        }
        console.error('Modification unidentified');
        return { label: getLabel('updated') };
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
