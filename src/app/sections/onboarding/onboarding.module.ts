import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatListModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OnboardingComponent } from './onboarding.component';
import { LayoutModule } from '../../layout';
import { DaDataModule } from '../../dadata/dadata.module';
import { OnboardingService } from './onboarding.service';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';
import { LayoutComponent } from './layout/layout.component';
import { StateNavModule } from '../../state-nav/state-nav.module';
import { DshButtonModule } from '../../button';

@NgModule({
    imports: [
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
        DshButtonModule
    ],
    declarations: [OnboardingComponent, LegalEntityComponent, LayoutComponent],
    entryComponents: [],
    providers: [OnboardingService]
})
export class OnboardingModule {}
