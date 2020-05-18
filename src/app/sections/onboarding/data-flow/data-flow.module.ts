import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';

import { QuestionaryModule } from '../../../api';
import { DataFlowRoutingModule } from './data-flow-routing.module';
import { DataFlowComponent } from './data-flow.component';
import { FinishOnboardingDialogComponent } from './finish-onboarding-dialog';
import { OnboardingFormsModule } from './forms';
import { HelpCardComponent } from './help-card';
import { QuestionaryStateService } from './questionary-state.service';
import { StepCardComponent } from './step-card';
import { StepFlowService } from './step-flow';
import { StepLabelPipe } from './step-label.pipe';
import { StepNavigationComponent } from './step-navigation';
import { ValidityService } from './validity';

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
        MatDialogModule,
    ],
    declarations: [
        DataFlowComponent,
        HelpCardComponent,
        StepCardComponent,
        StepNavigationComponent,
        StepLabelPipe,
        FinishOnboardingDialogComponent,
    ],
    providers: [StepFlowService, ValidityService, QuestionaryStateService],
    entryComponents: [FinishOnboardingDialogComponent],
})
export class DataFlowModule {}
