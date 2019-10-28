import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { QuestionaryConfigService } from './questionary-config.service';
import { GetQuestionaryService } from './get-questionary.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: QuestionaryConfigService }]
        }
    ],
    providers: [QuestionaryConfigService, GetQuestionaryService]
})
export class QuestionaryModule {}
