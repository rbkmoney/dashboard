import * as moment from 'moment';

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

function statusMapToColor(status: string): StatusColor {
    return {
        pending: StatusColor.pending,
        pendingAcceptance: StatusColor.pending,
        review: StatusColor.neutral,
        revoked: StatusColor.warn,
        denied: StatusColor.warn,
        accepted: StatusColor.success
    }[status];
}

interface ViewModificationUnitExtension {
    label: string;
    author: string;
    icon?: string;
    color?: StatusColor;
}

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
    get author(): string {
        return this.getExtensions().author;
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

    getExtensions(base: ModificationUnit = this.base): ViewModificationUnitExtension {
        let label: string;
        let author: string;
        let icon: string;
        let color: StatusColor;
        if (this.isTypedModification<ClaimModification>(base, 'ClaimModification')) {
            author = 'you';
            if (this.isTypedClaimModificationUnit<DocumentModificationUnit>(base, 'documentModificationType')) {
                switch (base.modification.modification.documentModificationType) {
                    case DocumentModification.DocumentModificationTypeEnum.DocumentCreated:
                        icon = 'add';
                        label = 'documentCreated';
                        break;
                }
            } else if (this.isTypedClaimModificationUnit<StatusModificationUnit>(base, 'statusModificationType')) {
                switch (base.modification.modification.statusModificationType) {
                    case StatusModification.StatusModificationTypeEnum.StatusChanged:
                        color = statusMapToColor(base.modification.status);
                        author = 'manager';
                        switch (base.modification.status) {
                            case StatusModificationUnit.StatusEnum.Accepted:
                                icon = 'insert_emoticon';
                                label = 'accepted';
                                break;
                            case StatusModificationUnit.StatusEnum.Denied:
                                icon = 'mood_bad';
                                label = 'denied';
                                break;
                            case StatusModificationUnit.StatusEnum.Pending:
                                icon = 'sentiment_satisfied';
                                label = 'pending';
                                break;
                            case StatusModificationUnit.StatusEnum.PendingAcceptance:
                                icon = 'sentiment_satisfied';
                                label = 'pendingAcceptance';
                                break;
                            case StatusModificationUnit.StatusEnum.Review:
                                icon = 'sentiment_satisfied';
                                label = 'review';
                                break;
                            case StatusModificationUnit.StatusEnum.Revoked:
                                icon = 'mood_bad';
                                label = 'revoked';
                                break;
                        }
                }
            } else if (this.isTypedClaimModificationUnit<FileModificationUnit>(base, 'fileModificationType')) {
                switch (base.modification.modification.fileModificationType) {
                    case FileModification.FileModificationTypeEnum.FileCreated:
                        icon = 'attach_file';
                        label = 'fileCreated';
                        break;
                }
            } else if (this.isTypedClaimModificationUnit<CommentModificationUnit>(base, 'commentModificationType')) {
                switch (base.modification.modification.commentModificationType) {
                    case CommentModification.CommentModificationTypeEnum.CommentCreated:
                        icon = 'mode_comment';
                        label = 'commentCreated';
                        break;
                }
            } else {
                console.error('Claim modification unidentified');
                label = 'claimUpdated';
            }
        } else if (this.isTypedModification<PartyModification>(base, 'PartyModification')) {
            author = 'manager';
            icon = 'create';
            if (this.isTypedPartyModificationUnit<ContractorModificationUnit>(base, 'contractorModificationType')) {
                switch (base.modification.modification.contractorModificationType) {
                    case ContractorModification.ContractorModificationTypeEnum.Contractor:
                        label = 'contractorUpdated';
                        break;
                }
            } else if (this.isTypedPartyModificationUnit<ContractModificationUnit>(base, 'contractModificationType')) {
                switch (base.modification.modification.contractModificationType) {
                    case ContractModification.ContractModificationTypeEnum.ContractAdjustmentModificationUnit:
                        label = 'contractUpdated';
                        break;
                    case ContractModification.ContractModificationTypeEnum.ContractParams:
                        label = 'contractUpdated';
                        break;
                    case ContractModification.ContractModificationTypeEnum.ContractTermination:
                        label = 'contractUpdated';
                        break;
                    case ContractModification.ContractModificationTypeEnum.ContractorID:
                        label = 'contractUpdated';
                        break;
                    case ContractModification.ContractModificationTypeEnum.LegalAgreement:
                        label = 'contractUpdated';
                        break;
                    case ContractModification.ContractModificationTypeEnum.PayoutToolModificationUnit:
                        label = 'contractUpdated';
                        break;
                    case ContractModification.ContractModificationTypeEnum.ReportPreferences:
                        label = 'contractUpdated';
                        break;
                }
            }
            // TODO: ShopModificationUnit
            // else if (this.isTypedPartyModificationUnit<ShopModificationUnit>(base, 'shopModificationType')) {
            //     console.error('Shop modification unidentified');
            // }
            else {
                // console.error('Party modification unidentified');
                label = 'shopUpdated';
            }
        }
        if (!label) {
            console.error('Modification unidentified');
            label = 'updated';
        }
        return {
            label: `common.claim.modification.label.${label}`,
            author: `common.claim.modification.author.${author || 'manager'}`,
            icon,
            color
        };
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
        return statusMapToColor(this.base.status);
    }

    constructor(public readonly base: Claim) {}
}
