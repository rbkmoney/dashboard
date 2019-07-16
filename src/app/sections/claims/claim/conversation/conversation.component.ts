import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import get from 'lodash.get';

import { ViewClaim } from '../../../../claims';
import { ClaimService } from '../claim.service';
import {
    ModificationUnit,
    Modification,
    DocumentModification,
    FileModification,
    StatusModification,
    CommentModification
} from '../../../../api/claim-management';
import { StatusColor } from '../../../../theme-manager';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss']
})
export class ConversationComponent {
    get claim$(): Observable<ViewClaim> {
        return this.claimService.claim$;
    }

    constructor(private claimService: ClaimService) {}

    getChangeIcon(change: ModificationUnit) {
        switch (change.modification.modificationType) {
            case Modification.ModificationTypeEnum.ClaimModification:
                const modification = get(change.modification, 'modification');
                if (modification) {
                    if (
                        (modification as DocumentModification).documentModificationType ===
                        DocumentModification.DocumentModificationTypeEnum.DocumentCreated
                    )
                        return 'attach_file';
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
        return 'create';
    }

    getChangeColor(change: ModificationUnit): StatusColor {
        switch (change.modification.modificationType) {
            case Modification.ModificationTypeEnum.ClaimModification:
                const modification = get(change.modification, 'modification');
                if (modification) {
                    if (
                        (modification as DocumentModification).documentModificationType ===
                        DocumentModification.DocumentModificationTypeEnum.DocumentCreated
                    )
                        return StatusColor.success;
                    if (
                        (modification as StatusModification).statusModificationType ===
                        StatusModification.StatusModificationTypeEnum.StatusChanged
                    )
                        return StatusColor.success;
                    if (
                        (modification as FileModification).fileModificationType ===
                        FileModification.FileModificationTypeEnum.FileCreated
                    )
                        return StatusColor.success;
                    if (
                        (modification as CommentModification).commentModificationType ===
                        CommentModification.CommentModificationTypeEnum.CommentCreated
                    )
                        return StatusColor.success;
                }
            case Modification.ModificationTypeEnum.PartyModification:
        }
    }
}
