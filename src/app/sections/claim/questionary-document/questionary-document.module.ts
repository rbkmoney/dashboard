import { NgModule } from '@angular/core';

import { QuestionaryModule as QuestionaryApiModule } from '../../../api';
import { CardModule } from '../../../layout/card';
import { ButtonModule } from '../../../button';
import { DocumentModule } from '../../../document/document.module';
import { QuestionaryDocumentService } from './questionary-document.service';

@NgModule({
    imports: [QuestionaryApiModule, CardModule, ButtonModule, DocumentModule],
    providers: [QuestionaryDocumentService]
})
export class QuestionaryDocumentModule {}
