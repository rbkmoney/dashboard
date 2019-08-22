import { NgModule } from '@angular/core';

import { QuestionaryComponent } from './questionary.component';
import { QuestionaryRoutingModule } from './questionary-routing.module';
import { QuestionaryModule as QuestionaryApiModule } from '../../questionary';
import { CardModule } from '../../layout/card';
import { ButtonModule } from '../../button';
import { DocumentModule } from '../../document/document.module';

@NgModule({
    imports: [QuestionaryRoutingModule, QuestionaryApiModule, CardModule, ButtonModule, DocumentModule],
    declarations: [QuestionaryComponent],
    exports: [QuestionaryComponent]
})
export class QuestionaryModule {}
