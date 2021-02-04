import { Injectable } from '@angular/core';

import { IdGeneratorService } from '@dsh/app/shared/services/id-generator/id-generator.service';

import { MessagesService as ApiMessagesService } from '../../../../api-codegen/sender';

@Injectable()
export class MessagesService {
    constructor(private messagesService: ApiMessagesService, private idGeneratorService: IdGeneratorService) {}

    sendFeedbackEmailMsg(text: string) {
        return this.messagesService.sendFeedbackEmailMsg(this.idGeneratorService.generateUUID(), { text });
    }
}
