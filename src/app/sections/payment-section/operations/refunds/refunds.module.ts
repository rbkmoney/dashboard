import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { FormControlsModule, RangeDatepickerModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule, StateNavModule } from '@dsh/components/navigation';
import { TableModule } from '@dsh/components/table';

import { ShopSelectorModule } from '../../../shop-selector';
import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsComponent } from './refunds.component';
import { RefundsListModule } from './refunds-list';
import { RefundsSearchFiltersModule } from './refunds-search-filters';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

@NgModule({
    imports: [
        CommonModule,
        RefundsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TableModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormControlsModule,
        IndicatorsModule,
        MatSnackBarModule,
        TranslocoModule,
        StateNavModule,
        MatMenuModule,
        RangeDatepickerModule,
        EmptySearchResultModule,
        ShopSelectorModule,
        ScrollUpModule,
        RefundsListModule,
        RefundsSearchFiltersModule,
        ShowMorePanelModule,
    ],
    declarations: [RefundsComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }],
})
export class RefundsModule {}
