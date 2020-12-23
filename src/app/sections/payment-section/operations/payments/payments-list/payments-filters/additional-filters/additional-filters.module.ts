import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { AdditionalFiltersService } from './additional-filters.service';
import { DialogFiltersComponent } from './components/dialog-filters.component';

@NgModule({
    imports: [CommonModule, BaseDialogModule, MatDividerModule, FlexLayoutModule, ButtonModule, TranslocoModule],
    declarations: [DialogFiltersComponent],
    providers: [AdditionalFiltersService],
})
export class AdditionalFiltersModule {}
