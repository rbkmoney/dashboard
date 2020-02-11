import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, of, forkJoin, BehaviorSubject, Observable, merge } from 'rxjs';
import { switchMap, filter, catchError, tap, pluck } from 'rxjs/operators';
import uuid from 'uuid';
import get from 'lodash.get';

import { MessagesService, createSingleMessageConversationParams } from '../../../../api';
import { ConversationID } from '../../../../api-codegen/messages';
import { progress } from '../../../../custom-operators';
import { UIError } from '../../../ui-error';

@Injectable()
export class SendCommentService {
    private conversationId$: BehaviorSubject<ConversationID | null> = new BehaviorSubject(null);
    private error$: BehaviorSubject<UIError> = new BehaviorSubject({ hasError: false });
    private sendComment$: Subject<string> = new Subject();

    form: FormGroup;
    conversationSaved$: Observable<ConversationID> = this.conversationId$.pipe(filter(id => !!id));
    errorCode$: Observable<string> = this.error$.pipe(pluck('code'));
    inProgress$: Observable<boolean> = progress(this.sendComment$, merge(this.conversationId$, this.error$));

    constructor(private fb: FormBuilder, private messagesService: MessagesService) {
        this.form = this.fb.group({
            comment: ['', [Validators.maxLength(1000)]]
        });
        this.sendComment$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                switchMap(text => {
                    const conversationId = uuid();
                    const params = createSingleMessageConversationParams(conversationId, text);
                    return forkJoin([
                        of(conversationId),
                        this.messagesService.saveConversations(params).pipe(
                            catchError(ex => {
                                console.error(ex);
                                const error = { hasError: true, code: 'saveConversationsFailed' };
                                this.error$.next(error);
                                return of(error);
                            })
                        )
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
