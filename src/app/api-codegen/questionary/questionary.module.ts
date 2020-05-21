import { NgModule } from '@angular/core';

import { GetQuestionaryService } from './get-questionary.service';
import { QuestionaryConfigService } from './questionary-config.service';
import { ApiModule, Configuration } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: QuestionaryConfigService }],
        },
    ],
    providers: [QuestionaryConfigService, GetQuestionaryService],
})
export class QuestionaryModule {}
