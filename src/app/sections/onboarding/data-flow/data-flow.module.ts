import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';

import { QuestionaryModule } from '@dsh/api/questionary';
import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { DataFlowRoutingModule } from './data-flow-routing.module';
import { DataFlowComponent } from './data-flow.component';
import { OnboardingFormsModule } from './forms';
import { HelpCardComponent } from './help-card';
import { QuestionaryStateService } from './questionary-state.service';
import { StepCardComponent } from './step-card';
import { StepFlowService } from './step-flow';
import { StepLabelPipe } from './step-label.pipe';
import { StepNavigationComponent } from './step-navigation';
import { ValidationCheckService } from './validation-check';
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
        ConfirmActionDialogModule,
    ],
    declarations: [DataFlowComponent, HelpCardComponent, StepCardComponent, StepNavigationComponent, StepLabelPipe],
    providers: [StepFlowService, ValidityService, QuestionaryStateService, ValidationCheckService],
})
export class DataFlowModule {}
