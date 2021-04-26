import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { AutocompleteVirtualScrollModule } from '@dsh/app/shared';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { AutocompleteInputModule } from '@dsh/app/shared/components/inputs/autocomplete-input/autocomplete-input.module';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateWebhookDialogComponent } from './create-webhook-dialog.component';
import { CreateWebhookFormComponent } from './create-webhook-form';
import { CreateWebhookService } from './create-webhook.service';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        MatDialogModule,
        ButtonModule,
        TranslocoModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatRadioModule,
        MatCheckboxModule,
        MatInputModule,
        BaseDialogModule,
        AutocompleteVirtualScrollModule,
        AutocompleteInputModule,
        MatAutocompleteModule,
    ],
    declarations: [CreateWebhookDialogComponent, CreateWebhookFormComponent],
    providers: [CreateWebhookService],
})
export class CreateWebhookModule {}
