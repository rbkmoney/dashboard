import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { SelectSearchFieldComponent } from './select-search-field.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        BootstrapIconModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        TranslocoModule,
    ],
    declarations: [SelectSearchFieldComponent],
    exports: [SelectSearchFieldComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'select-search-field' }],
})
export class SelectSearchFieldModule {}
