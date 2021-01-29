import { NgModule } from '@angular/core';

import { SenderModule as ApiSenderModule } from '../../api-codegen/sender';
import { IdGeneratorModule } from '../../shared/services';
import { MessagesService } from './services/messages/messages.service';

@NgModule({
    imports: [ApiSenderModule, IdGeneratorModule],
    providers: [MessagesService],
})
export class SenderModule {}
