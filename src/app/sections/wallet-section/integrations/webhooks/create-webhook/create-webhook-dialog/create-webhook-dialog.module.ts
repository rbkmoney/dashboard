import { NgModule } from '@angular/core';

import { CreateWebhookDialogComponent } from './create-webhook-dialog.component';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from '@dsh/components/buttons';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

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
