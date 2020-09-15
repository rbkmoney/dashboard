import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { PayoutToolDetailsModule } from '@dsh/app/shared/components';
import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';

import { PayoutsModule, QuestionaryModule } from '../../api';
import { DaDataModule } from '../../dadata';
import {
    CreateShopInternationalLegalEntityComponent,
    InternationalPayoutToolFormComponent,
} from './create-shop-international-legal-entity';
import { CreateShopRussianLegalEntityComponent } from './create-shop-russian-legal-entity';

const EXPORTED_DECLARATIONS = [CreateShopRussianLegalEntityComponent, CreateShopInternationalLegalEntityComponent];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatFormFieldModule,
        FormsModule,
        FlexLayoutModule,
        TranslocoModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        ButtonModule,
        DaDataModule,
        FormControlsModule,
        LayoutModule,
        PayoutsModule,
        MatSnackBarModule,
        QuestionaryModule,
        RouterModule,
        MatCheckboxModule,
        PayoutToolDetailsModule,
    ],
    declarations: [...EXPORTED_DECLARATIONS, InternationalPayoutToolFormComponent],
    exports: EXPORTED_DECLARATIONS,
})
export class CreateShopModule {}
