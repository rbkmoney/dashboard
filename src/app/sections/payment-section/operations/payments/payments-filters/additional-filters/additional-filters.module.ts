import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { AdditionalFiltersService } from './additional-filters.service';
import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { MainFiltersComponent } from './components/main-filters/main-filters.component';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
    declarations: [DialogFiltersComponent, MainFiltersComponent],
    providers: [AdditionalFiltersService],
})
export class AdditionalFiltersModule {}
