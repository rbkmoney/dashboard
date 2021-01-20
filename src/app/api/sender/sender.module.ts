import { NgModule } from '@angular/core';
import { SenderModule as ApiSenderModule } from '../../api-codegen/sender';
import { UuidGeneratorModule } from '../../shared/services';
import { MessagesService } from './services/messages/messages.service';

@NgModule({
    imports: [ApiSenderModule, UuidGeneratorModule],
    providers: [MessagesService],
})
export class SenderModule {}
