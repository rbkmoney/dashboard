import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ViewClaim } from '../../../../claims';
import { ClaimService } from '../claim.service';
import { ModificationUnit, Modification, ClaimModification } from '../../../../api/claim-management';

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
                switch ((change.modification as ClaimModification).claimModificationType) {
                    case ClaimModification.ClaimModificationTypeEnum.DocumentModificationUnit:
                        return;
                    case ClaimModification.ClaimModificationTypeEnum.CommentModificationUnit:
                        return;
                    case ClaimModification.ClaimModificationTypeEnum.FileModificationUnit:
                        return;
                    case ClaimModification.ClaimModificationTypeEnum.StatusModificationUnit:
                        return;
                }
            case Modification.ModificationTypeEnum.PartyModification:
                return;
        }
    }
}
