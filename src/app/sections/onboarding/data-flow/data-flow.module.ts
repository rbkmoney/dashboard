import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

import { DataFlowComponent } from './data-flow.component';
import { BasicInfoComponent } from './basic-info';
import { DataFlowRoutingModule } from './data-flow-routing.module';
import { LayoutModule } from '../../../layout';
import { StateNavModule } from '../../../state-nav';
import { ButtonModule } from '../../../button';
import { LocaleModule } from '../../../locale';
import { HelpCardComponent } from './help-card';
import { StepCardComponent } from './step-card';
import { StepNavigationComponent } from './step-navigation';
import { StepLabelPipe } from './step-card';
import { RussianPrivateEntityComponent } from './russian-private-entity';
import { QuestionaryModule } from '../../../api';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        DataFlowRoutingModule,
        LayoutModule,
        StateNavModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        LocaleModule,
        QuestionaryModule
    ],
    declarations: [
        DataFlowComponent,
        BasicInfoComponent,
        RussianPrivateEntityComponent,
        HelpCardComponent,
        StepCardComponent,
        StepNavigationComponent,
        StepLabelPipe
    ]
})
export class DataFlowModule {}
