import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CreateWebhookDialogComponent } from './create-webhook-dialog.component';

@NgModule({
    imports: [
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        ButtonModule,
        MatInputModule,
        TranslocoModule,
        CommonModule,
        MatRadioModule,
        MatDividerModule,
        MatDialogModule,
    ],
    declarations: [CreateWebhookDialogComponent],
})
export class CreateWebhookDialogModule {}
