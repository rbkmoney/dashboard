import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommentModificationUnit } from '../../../api-codegen/claim-management';
import { CommentContainerService } from './comment-container.service';

@Component({
    selector: 'dsh-comment-container',
    templateUrl: 'comment-container.component.html',
    providers: [CommentContainerService],
})
export class CommentContainerComponent implements OnChanges {
    @Input() unit: CommentModificationUnit;

    comment$ = this.commentContainerService.comment$;
    isLoading$ = this.commentContainerService.isLoading$;
    error$ = this.commentContainerService.error$;

    constructor(private commentContainerService: CommentContainerService) {}

    ngOnChanges({ unit }: SimpleChanges) {
        if (unit.firstChange || unit.currentValue.commentId !== unit.previousValue.commentId) {
            this.commentContainerService.receiveConversation(unit.currentValue.commentId);
        }
    }
}
