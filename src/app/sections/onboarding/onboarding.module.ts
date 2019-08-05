import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatIconModule } from '@angular/material';

import { LayoutModule } from '../../layout';
import { DaDataModule } from '../../dadata';
import { OnboardingService } from './onboarding.service';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';
import { LayoutComponent } from './layout/layout.component';
import { StateNavModule } from '../../state-nav';
import { ButtonModule } from '../../button';
import { LocaleModule } from '../../locale';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { CompanySearchModule } from './company-search';
import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';
import { StepperItemComponent } from './vertical-stepper/stepper-item/stepper-item.component';

@NgModule({
    imports: [
        OnboardingRoutingModule,
        CompanySearchModule,
        LayoutModule,
        DaDataModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CommonModule,
        MatListModule,
        MatRadioModule,
        RouterModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        StateNavModule,
        ButtonModule,
        LocaleModule,
        MatDialogModule,
        MatIconModule
    ],
    declarations: [LegalEntityComponent, LayoutComponent, VerticalStepperComponent, StepperItemComponent],
    providers: [OnboardingService]
})
export class OnboardingModule {}
