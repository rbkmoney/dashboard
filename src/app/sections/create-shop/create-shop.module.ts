import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';

import { PayoutsModule, QuestionaryModule } from '../../api';
import { DaDataModule } from '../../dadata';
import { PayoutToolInfoModule } from '../payout-tool-info';
import { CreateShopRussianLegalEntityComponent } from './create-shop-russian-legal-entity';

const EXPORTED_DECLARATIONS = [CreateShopRussianLegalEntityComponent];

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
        PayoutToolInfoModule,
        MatSnackBarModule,
        QuestionaryModule,
        RouterModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class CreateShopModule {}
