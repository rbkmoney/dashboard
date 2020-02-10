import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDialogModule } from '@angular/material/dialog';

import { DataFlowComponent } from './data-flow.component';
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
import { OnboardingFormsModule } from './forms';
import { QuestionaryStateService } from './questionary-state.service';
import { StepFlowService } from './step-flow';
import { ValidityService } from './validity';
import { FinishOnboardingDialogComponent } from './finish-onboarding-dialog';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        DataFlowRoutingModule,
        LayoutModule,
        StateNavModule,
        ButtonModule,
        QuestionaryModule,
        TranslocoModule,
        SpinnerModule,
        OnboardingFormsModule,
        MatDialogModule
    ],
    declarations: [
        DataFlowComponent,
        HelpCardComponent,
        StepCardComponent,
        StepNavigationComponent,
        StepLabelPipe,
        FinishOnboardingDialogComponent
    ],
    providers: [StepFlowService, ValidityService, QuestionaryStateService],
    entryComponents: [FinishOnboardingDialogComponent]
})
export class DataFlowModule {}
