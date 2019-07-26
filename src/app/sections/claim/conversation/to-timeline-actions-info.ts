import get from 'lodash.get';
import * as moment from 'moment';

import {
    ModificationUnit,
    Modification,
    DocumentModification,
    StatusModification,
    FileModification,
    CommentModification,
    StatusModificationUnit,
    ClaimModification,
    DocumentModificationUnit,
    FileModificationUnit,
    CommentModificationUnit,
    PartyModification
} from '../../../api/claim-management';
import { StatusColor } from '../../../theme-manager';

enum TimelineAction {
    claimCreated, // создана заявка
    changesAdded, // добавлены изменения
    documentsAdded, // добавлены документы
    commentAdded, // добавлен комментарий
    statusReview, // заявка отправлена на рассмотрение
    statusPendindAcceptance, // заявка рассмотренна. Требуются ваши действия.
    statusDenied, // заявка отклонена
    statusRevoked, // заявка отозвана
    statusAccepted, // заявка одобрена
    statusPending // заявка переведена в статус: В работе
}

function getTimelineActionIconName(action: TimelineAction) {
    return ({
        [TimelineAction.statusPending]: 'sentiment_satisfied',
        [TimelineAction.statusPendindAcceptance]: 'sentiment_satisfied',
        [TimelineAction.statusReview]: 'sentiment_satisfied',
        [TimelineAction.statusRevoked]: 'mood_bad',
        [TimelineAction.statusDenied]: 'mood_bad',
        [TimelineAction.statusAccepted]: 'insert_emoticon',
        [TimelineAction.claimCreated]: 'add',
        [TimelineAction.documentsAdded]: 'attach_file',
        [TimelineAction.commentAdded]: 'mode_comment',
        [TimelineAction.changesAdded]: 'create'
    } as const)[action];
}

function getTimelineActionColor(action: TimelineAction): StatusColor {
    return {
        [TimelineAction.statusPending]: StatusColor.pending,
        [TimelineAction.statusPendindAcceptance]: StatusColor.pending,
        [TimelineAction.statusReview]: StatusColor.neutral,
        [TimelineAction.statusRevoked]: StatusColor.warn,
        [TimelineAction.statusDenied]: StatusColor.warn,
        [TimelineAction.statusAccepted]: StatusColor.success
    }[action];
}

function getTimelineActionName(action: TimelineAction): string {
    const timelineActionName = ({
        [TimelineAction.statusPending]: 'pending',
        [TimelineAction.statusPendindAcceptance]: 'pendindAcceptance',
        [TimelineAction.statusReview]: 'review',
        [TimelineAction.statusRevoked]: 'revoked',
        [TimelineAction.statusDenied]: 'denied',
        [TimelineAction.statusAccepted]: 'accepted',
        [TimelineAction.claimCreated]: 'claimCreated',
        [TimelineAction.documentsAdded]: 'documentAdded',
        [TimelineAction.commentAdded]: 'commentAdded',
        [TimelineAction.changesAdded]: 'changesAdded'
    } as const)[action];
    return timelineActionName ? `common.claim.modification.action.${timelineActionName}` : undefined;
}

interface TimelineActionInfo {
    action: TimelineAction;
    actionName: string;
    author: string;
    createdAt: string;
    iconName?: ReturnType<typeof getTimelineActionIconName>;
    color?: StatusColor;
}

function sortUnits(units: ModificationUnit[]): ModificationUnit[] {
    return units.sort(({ createdAt: a }, { createdAt: b }) => moment(a).milliseconds() - moment(b).milliseconds());
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

function getUnitTimelineAction(unit: ModificationUnit): TimelineAction {
    if (isModification<ClaimModification>(unit, 'ClaimModification')) {
        if (isClaimModificationUnit<DocumentModificationUnit>(unit, 'documentModificationType')) {
            switch (unit.modification.modification.documentModificationType) {
                case DocumentModification.DocumentModificationTypeEnum.DocumentCreated:
                    return TimelineAction.claimCreated;
            }
        } else if (isClaimModificationUnit<StatusModificationUnit>(unit, 'statusModificationType')) {
            switch (unit.modification.modification.statusModificationType) {
                case StatusModification.StatusModificationTypeEnum.StatusChanged:
                    switch (unit.modification.status) {
                        case StatusModificationUnit.StatusEnum.Accepted:
                            return TimelineAction.statusAccepted;
                        case StatusModificationUnit.StatusEnum.Denied:
                            return TimelineAction.statusDenied;
                        case StatusModificationUnit.StatusEnum.Pending:
                            return TimelineAction.statusPending;
                        case StatusModificationUnit.StatusEnum.PendingAcceptance:
                            return TimelineAction.statusPendindAcceptance;
                        case StatusModificationUnit.StatusEnum.Review:
                            return TimelineAction.statusReview;
                        case StatusModificationUnit.StatusEnum.Revoked:
                            return TimelineAction.statusRevoked;
                    }
            }
        } else if (isClaimModificationUnit<FileModificationUnit>(unit, 'fileModificationType')) {
            switch (unit.modification.modification.fileModificationType) {
                case FileModification.FileModificationTypeEnum.FileCreated:
                    return TimelineAction.documentsAdded;
            }
        } else if (isClaimModificationUnit<CommentModificationUnit>(unit, 'commentModificationType')) {
            switch (unit.modification.modification.commentModificationType) {
                case CommentModification.CommentModificationTypeEnum.CommentCreated:
                    return TimelineAction.commentAdded;
            }
        } else {
            console.error('Claim modification unidentified');
            return;
        }
    } else if (isModification<PartyModification>(unit, 'PartyModification')) {
        return TimelineAction.changesAdded;
    }
    console.error('Modification unidentified');
}

export function toTimelineActionInfo(unit: ModificationUnit): TimelineActionInfo {
    const action = getUnitTimelineAction(unit);
    return {
        action,
        actionName: getTimelineActionName(action),
        author: 'common.claim.modification.author.manager',
        createdAt: (unit.createdAt as any) as string,
        iconName: getTimelineActionIconName(action),
        color: getTimelineActionColor(action)
    };
}

export function toTimelineActionsInfo(units: ModificationUnit[]): TimelineActionInfo[] {
    return sortUnits(units).map(toTimelineActionInfo);
}
