import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule, StatusModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, ExpandPanelModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ClaimDetailsModule } from './claim-details/claim-details.module';
import { ClaimsListComponent } from './claims-list.component';
import { ClaimRowHeaderComponent } from './components/claim-row-header/claim-row-header.component';
import { ClaimRowComponent } from './components/claim-row/claim-row.component';
import { ClaimsListPipesModule } from './pipes/claims-list-pipes.module';

@NgModule({
    declarations: [ClaimsListComponent, ClaimRowHeaderComponent, ClaimRowComponent],
    imports: [
        FlexModule,
        TranslocoModule,
        LastUpdatedModule,
        SpinnerModule,
        CommonModule,
        AccordionModule,
        CardModule,
        ExpandPanelModule,
        ShowMorePanelModule,
        EmptySearchResultModule,
        RowModule,
        ExtendedModule,
        StatusModule,
        ClaimDetailsModule,
        ClaimsListPipesModule,
    ],
    exports: [ClaimsListComponent],
})
export class ClaimsListModule {}
