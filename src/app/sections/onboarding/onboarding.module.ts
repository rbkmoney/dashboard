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

import { OnboardingComponent } from './onboarding.component';
import { LayoutModule } from '../../layout';
import { DaDataModule } from '../../dadata/dadata.module';
import { OnboardingService } from './onboarding.service';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';
import { LayoutComponent } from './layout/layout.component';
import { StateNavModule } from '../../state-nav/state-nav.module';
import { ButtonModule } from '../../button';
import { LocaleModule } from '../../locale/locale.module';

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
        ButtonModule,
        LocaleModule
    ],
    declarations: [OnboardingComponent, LegalEntityComponent, LayoutComponent],
    entryComponents: [],
    providers: [OnboardingService]
})
export class OnboardingModule {}
