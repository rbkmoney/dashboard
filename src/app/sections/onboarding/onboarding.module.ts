import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OnboardingComponent } from './onboarding.component';
import { LayoutModule } from '../../layout';
import { DaDataModule } from '../../dadata/dadata.module';

@NgModule({
    imports: [LayoutModule, DaDataModule, MatFormFieldModule, ReactiveFormsModule, FlexLayoutModule],
    declarations: [OnboardingComponent],
    entryComponents: [],
    providers: [OnboardingComponent]
})
export class OnboardingModule {}
