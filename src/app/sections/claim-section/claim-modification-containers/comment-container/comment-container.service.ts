import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { MessagesService } from '@dsh/api/messages';

import { booleanDelay, takeError } from '../../../../custom-operators';

@Injectable()
export class CommentContainerService {
    private receiveConversation$: Subject<string> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    comment$ = this.receiveConversation$.pipe(
        switchMap((conversationId) => this.messageService.getConversations([conversationId])),
        map(({ conversations }) =>
            conversations.reduce((acc, { messages }) => (messages.length > 0 ? messages[0] : acc), { text: '' })
        ),
        pluck('text'),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.comment$.pipe(booleanDelay(), shareReplay(1));

    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.comment$.pipe(takeError, shareReplay(1));

    constructor(private messageService: MessagesService) {
        this.comment$.subscribe();
    }

    receiveConversation(commentId: string) {
        this.receiveConversation$.next(commentId);
    }
}
