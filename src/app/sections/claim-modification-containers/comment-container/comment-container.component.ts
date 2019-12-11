import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommentModificationUnit } from '../../../api-codegen/claim-management';
import { CommentContainerService } from './comment-container.service';

@Component({
    selector: 'dsh-comment-container',
    templateUrl: 'comment-container.component.html',
    styleUrls: ['comment-container.component.scss'],
    providers: [CommentContainerService]
})
export class CommentContainerComponent implements OnChanges {
    @Input() unit: CommentModificationUnit;

    comment$ = this.commentContainerService.comment$;
    isLoading$ = this.commentContainerService.isLoading$;
    isError$ = this.commentContainerService.isError$;

    constructor(private commentContainerService: CommentContainerService) {}

    ngOnChanges({ unit }: SimpleChanges) {
        this.commentContainerService.receiveConversation(unit.currentValue);
    }
}
