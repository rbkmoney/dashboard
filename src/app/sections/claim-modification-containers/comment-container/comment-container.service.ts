import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { MessagesService } from '../../../api';
import { booleanDebounceTime, SHARE_REPLAY_CONF, takeError } from '../../../custom-operators';

@Injectable()
export class CommentContainerService {
    private receiveConversation$: Subject<string> = new Subject();

    comment$ = this.receiveConversation$.pipe(
        switchMap(conversationId => this.messageService.getConversations([conversationId])),
        map(({ conversations }) =>
            conversations.reduce((acc, { messages }) => (messages.length > 0 ? messages[0] : acc), { text: '' })
        ),
        pluck('text'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$ = this.comment$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));

    error$ = this.comment$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private messageService: MessagesService) {
        this.comment$.subscribe();
    }

    receiveConversation(commentId: string) {
        this.receiveConversation$.next(commentId);
    }
}
