import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, shareReplay, map, pluck } from 'rxjs/operators';

import { MessagesService } from '../../../api';
import { booleanDelay, takeError } from '../../../custom-operators';

@Injectable()
export class CommentContainerService {
    private receiveConversation$: Subject<string> = new Subject();

    comment$ = this.receiveConversation$.pipe(
        switchMap(conversationId => this.messageService.getConversations([conversationId], 'ACTUAL' as any)),
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

    error$ = this.comment$.pipe(
        takeError,
        shareReplay(1)
    );

    constructor(private messageService: MessagesService) {
        this.comment$.subscribe();
    }

    receiveConversation(commentId: string) {
        this.receiveConversation$.next(commentId);
    }
}
