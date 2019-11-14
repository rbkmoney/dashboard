import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { MessagesConfigService } from './messages-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: MessagesConfigService }]
        }
    ],
    providers: [MessagesConfigService]
})
export class MessagesModule {}
