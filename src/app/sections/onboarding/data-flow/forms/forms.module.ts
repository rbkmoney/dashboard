import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';

import { BasicInfoService, BasicInfoComponent } from './basic-info';
import { RussianPrivateEntityComponent } from './russian-private-entity';
import { RussianLegalOwnerComponent } from './russian-legal-owner';
import { InitializeFormsService } from './initialize-forms.service';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MatInputModule, TranslocoModule],
    declarations: [BasicInfoComponent, RussianPrivateEntityComponent, RussianLegalOwnerComponent],
    providers: [InitializeFormsService, BasicInfoService]
})
export class OnboardingFormsModule {}
