import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { DataFlowComponent } from './data-flow.component';
import { BasicInfoComponent, RussianLegalOwnerComponent, RussianPrivateEntityComponent } from './forms';
import { DataFlowRoutingModule } from './data-flow-routing.module';
import { LayoutModule } from '../../../layout';
import { StateNavModule } from '../../../state-nav';
import { ButtonModule } from '../../../button';
import { HelpCardComponent } from './help-card';
import { StepCardComponent } from './step-card';
import { StepNavigationComponent } from './step-navigation';
import { QuestionaryModule } from '../../../api';
import { StepLabelPipe } from './step-label.pipe';
import { SpinnerModule } from '../../../spinner';

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
        QuestionaryModule,
        TranslocoModule,
        SpinnerModule
    ],
    declarations: [
        DataFlowComponent,
        BasicInfoComponent,
        RussianPrivateEntityComponent,
        RussianLegalOwnerComponent,
        HelpCardComponent,
        StepCardComponent,
        StepNavigationComponent,
        StepLabelPipe
    ]
})
export class DataFlowModule {}
