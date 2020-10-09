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
import { CreateWebhookFormComponent } from './create-webhook-form';
import { CreateWebhookService } from './create-webhook.service';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        ButtonModule,
        TranslocoModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDialogModule,
        MatInputModule,
    ],
    declarations: [CreateWebhookDialogComponent, CreateWebhookFormComponent],
    entryComponents: [CreateWebhookDialogComponent],
    providers: [CreateWebhookService],
})
export class CreateWebhookModule {}
