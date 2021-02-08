import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { AdditionalFiltersService } from './additional-filters.service';
import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { MainFiltersModule } from './main-filters';
import { StatusFiltersModule } from './status-filters';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatIconModule,
        MainFiltersModule,
        StatusFiltersModule,
        MatDividerModule,
    ],
    declarations: [DialogFiltersComponent],
    providers: [AdditionalFiltersService],
})
export class AdditionalFiltersModule {}
