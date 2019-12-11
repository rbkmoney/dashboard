import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CommentModificationUnit } from '../../../api-codegen/claim-management';
import { MessagesService } from '../../../api';
import { switchMap, shareReplay, map, pluck } from 'rxjs/operators';
import { booleanDelay, takeError } from '../../../custom-operators';

@Injectable()
export class CommentContainerService {
    private receiveConversation$: Subject<string> = new Subject();

    comment$ = this.receiveConversation$.pipe(
        switchMap(conversationId => this.messageService.getConversations([conversationId])),
        map(({ conversations }) =>
            conversations.reduce((acc, { messages }) => (messages.length > 0 ? messages[0] : acc), { text: '' })
        ),
        pluck('text'),
        shareReplay(1)
    );

    isLoading$ = this.comment$.pipe(
        booleanDelay(),
        shareReplay(1)
    );

    isError$ = this.comment$.pipe(
        takeError,
        map(err => !!err),
        shareReplay(1)
    );

    constructor(private messageService: MessagesService) {
        this.comment$.subscribe();
    }

    receiveConversation({ commentId }: CommentModificationUnit) {
        this.receiveConversation$.next(commentId);
    }
}
