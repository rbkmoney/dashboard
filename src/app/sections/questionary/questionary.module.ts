import { NgModule } from '@angular/core';

import { QuestionaryComponent } from './questionary.component';
import { QuestionaryRoutingModule } from './questionary-routing.module';
import { QuestionaryModule as QuestionaryApiModule } from '../../questionary';
import { CardModule } from '../../layout/card';
import { ButtonModule } from '../../button';

@NgModule({
    imports: [QuestionaryRoutingModule, QuestionaryApiModule, CardModule, ButtonModule],
    declarations: [QuestionaryComponent],
    exports: [QuestionaryComponent]
})
export class QuestionaryModule {}
