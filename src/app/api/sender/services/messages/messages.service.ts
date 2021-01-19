import { Injectable } from '@angular/core';
import { MessagesService as ApiMessagesService } from '../../../../api-codegen/sender';
import { UuidGeneratorService } from '../../../../shared/services/uuid-generator/uuid-generator.service';

@Injectable()
export class MessagesService {
    constructor(private messagesService: ApiMessagesService, private idGeneratorService: UuidGeneratorService) {}

    sendFeedbackEmailMsg(text: string) {
        return this.messagesService.sendFeedbackEmailMsg(this.idGeneratorService.generateUUID(), { text });
    }
}
