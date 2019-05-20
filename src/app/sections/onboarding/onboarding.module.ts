import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OnboardingComponent } from './onboarding.component';
import { LayoutModule } from '../../layout';
import { DaDataModule } from '../../dadata/dadata.module';
import { OnboardingService } from './onboarding.service';
import { AboutLegalEntityComponent } from './about-legal-entity/about-legal-entity.component';
import { MatFormFieldRequiredModule } from 'src/app/mat-form-field-required';

@NgModule({
    imports: [
        LayoutModule,
        DaDataModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CommonModule,
        MatListModule,
        MatButtonModule,
        MatRadioModule,
        RouterModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldRequiredModule
    ],
    declarations: [OnboardingComponent, AboutLegalEntityComponent],
    entryComponents: [],
    providers: [OnboardingService]
})
export class OnboardingModule {}
