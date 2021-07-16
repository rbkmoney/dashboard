import { NgModule } from '@angular/core';

import { SenderModule as ApiSenderModule } from '../../api-codegen/sender';
import { MessagesService } from './services/messages/messages.service';

@NgModule({
    imports: [ApiSenderModule],
    providers: [MessagesService],
})
export class SenderModule {}
