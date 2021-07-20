import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimFieldComponent } from './claim-field.component';

@NgModule({
    imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, TranslocoModule],
    declarations: [ClaimFieldComponent],
    exports: [ClaimFieldComponent],
})
export class ClaimFieldModule {}
