import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { QuestionaryAggrProxyConfigService } from './questionary-aggr-proxy-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: QuestionaryAggrProxyConfigService }]
        }
    ],
    providers: [QuestionaryAggrProxyConfigService]
})
export class QuestionaryAggrProxyModule {}
