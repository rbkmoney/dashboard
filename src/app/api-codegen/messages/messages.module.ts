import { NgModule } from '@angular/core';

import { MessagesConfigService } from './messages-config.service';
import { ApiModule, Configuration } from './openapi-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: MessagesConfigService }],
        },
    ],
    providers: [MessagesConfigService],
})
export class MessagesModule {}
