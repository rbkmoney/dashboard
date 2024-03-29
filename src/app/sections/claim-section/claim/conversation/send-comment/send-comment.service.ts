import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { progress } from '@rbkmoney/utils';
import get from 'lodash-es/get';
import { BehaviorSubject, forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, pluck, switchMap, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Conversation } from '@dsh/api-codegen/messages';
import { createSingleMessageConversationParams, MessagesService } from '@dsh/api/messages';

import { UiError } from '../../../../ui-error';

@Injectable()
export class SendCommentService {
    private conversationId$: BehaviorSubject<Conversation['conversationId'] | null> = new BehaviorSubject(null);
    private error$: BehaviorSubject<UiError> = new BehaviorSubject({ hasError: false });
    private sendComment$: Subject<string> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form: FormGroup;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    conversationSaved$: Observable<Conversation['conversationId']> = this.conversationId$.pipe(filter((id) => !!id));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorCode$: Observable<string> = this.error$.pipe(pluck('code'));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$: Observable<boolean> = progress(this.sendComment$, merge(this.conversationId$, this.error$));

    constructor(private fb: FormBuilder, private messagesService: MessagesService) {
        this.form = this.fb.group({
            comment: ['', [Validators.maxLength(1000)]],
        });
        this.sendComment$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                switchMap((text) => {
                    const conversationId = uuid();
                    const params = createSingleMessageConversationParams(conversationId, text);
                    return forkJoin([
                        of(conversationId),
                        this.messagesService.saveConversations(params).pipe(
                            catchError((ex) => {
                                console.error(ex);
                                const error = { hasError: true, code: 'saveConversationsFailed' };
                                this.error$.next(error);
                                return of(error);
                            })
                        ),
                    ]);
                }),
                filter(([, res]) => get(res, ['hasError']) !== true)
            )
            .subscribe(([conversationId]) => {
                this.conversationId$.next(conversationId);
                this.form.reset();
            });
    }

    sendComment(comment: string) {
        if (comment.length === 0) {
            return;
        }
        this.sendComment$.next(comment);
    }
}
