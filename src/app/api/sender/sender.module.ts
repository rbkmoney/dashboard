import { NgModule } from '@angular/core';
import { MessagesService, SenderModule as ApiSenderModule } from '../../api-codegen/sender';
import { UuidGeneratorModule } from '../../shared';

@NgModule({
    imports: [ApiSenderModule, UuidGeneratorModule],
    providers: [MessagesService],
})
export class SenderModule {}
