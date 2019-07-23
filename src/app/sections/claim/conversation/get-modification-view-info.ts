import get from 'lodash.get';

import {
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
} from '../../../api/claim-management';
import { StatusColor } from '../../../theme-manager';

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

function isModification<M extends Modification>(
    unit: ModificationUnit,
    type: Modification.ModificationTypeEnum
): unit is ModificationUnit & { modification: M } {
    return get(unit, 'modification.modificationType') === type;
}

function isClaimModificationUnit<M extends ClaimModification & { modification: any }>(
    unit: ModificationUnit & { modification: ClaimModification },
    modificationType: keyof M['modification']
): unit is ModificationUnit & { modification: M } {
    return !!get(unit.modification, ['modification', modificationType]);
}

function isPartyModificationUnit<M extends PartyModification & { modification: any }>(
    unit: ModificationUnit & { modification: PartyModification },
    modificationType: keyof M['modification']
): unit is ModificationUnit & { modification: M } {
    return !!get(unit.modification, ['modification', modificationType]);
}

export interface ModificationUnitViewInfo {
    label: string;
    author: string;
    icon?: string;
    color?: StatusColor;
}

export function getModificationViewInfo(unit: ModificationUnit): ModificationUnitViewInfo {
    let label: string;
    let author: string;
    let icon: string;
    let color: StatusColor;
    if (isModification<ClaimModification>(unit, 'ClaimModification')) {
        author = 'you';
        if (isClaimModificationUnit<DocumentModificationUnit>(unit, 'documentModificationType')) {
            switch (unit.modification.modification.documentModificationType) {
                case DocumentModification.DocumentModificationTypeEnum.DocumentCreated:
                    icon = 'add';
                    label = 'documentCreated';
                    break;
            }
        } else if (isClaimModificationUnit<StatusModificationUnit>(unit, 'statusModificationType')) {
            switch (unit.modification.modification.statusModificationType) {
                case StatusModification.StatusModificationTypeEnum.StatusChanged:
                    color = statusMapToColor(unit.modification.status);
                    author = 'manager';
                    switch (unit.modification.status) {
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
        } else if (isClaimModificationUnit<FileModificationUnit>(unit, 'fileModificationType')) {
            switch (unit.modification.modification.fileModificationType) {
                case FileModification.FileModificationTypeEnum.FileCreated:
                    icon = 'attach_file';
                    label = 'fileCreated';
                    break;
            }
        } else if (isClaimModificationUnit<CommentModificationUnit>(unit, 'commentModificationType')) {
            switch (unit.modification.modification.commentModificationType) {
                case CommentModification.CommentModificationTypeEnum.CommentCreated:
                    icon = 'mode_comment';
                    label = 'commentCreated';
                    break;
            }
        } else {
            console.error('Claim modification unidentified');
            label = 'claimUpdated';
        }
    } else if (isModification<PartyModification>(unit, 'PartyModification')) {
        author = 'manager';
        icon = 'create';
        if (isPartyModificationUnit<ContractorModificationUnit>(unit, 'contractorModificationType')) {
            switch (unit.modification.modification.contractorModificationType) {
                case ContractorModification.ContractorModificationTypeEnum.Contractor:
                    label = 'contractorUpdated';
                    break;
            }
        } else if (isPartyModificationUnit<ContractModificationUnit>(unit, 'contractModificationType')) {
            switch (unit.modification.modification.contractModificationType) {
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
        // else if (isTypedPartyModificationUnit<ShopModificationUnit>(base, 'shopModificationType')) {
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
