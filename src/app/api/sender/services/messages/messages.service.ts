import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import { MessagesService as ApiMessagesService } from '../../../../api-codegen/sender';

@Injectable()
export class MessagesService {
    constructor(private messagesService: ApiMessagesService, private idGeneratorService: IdGeneratorService) {}

    sendFeedbackEmailMsg(text: string): Observable<any> {
        return this.messagesService.sendFeedbackEmailMsg(this.idGeneratorService.shortUuid(), { text });
    }
}
