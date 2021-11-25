import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelTypesModule } from '@dsh/app/shared/pipes';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule, StatusModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, RowModule } from '@dsh/components/layout';
import { NavigationLinkModule } from '@dsh/components/navigation-link';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ClaimsListComponent } from './claims-list.component';
import { ClaimRowHeaderComponent } from './components/claim-row-header/claim-row-header.component';
import { ClaimRowComponent } from './components/claim-row/claim-row.component';

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
        ShowMorePanelModule,
        EmptySearchResultModule,
        RowModule,
        ExtendedModule,
        StatusModule,
        ApiModelTypesModule,
        MatIconModule,
        MatDividerModule,
        NavigationLinkModule,
    ],
    exports: [ClaimsListComponent],
})
export class ClaimsListModule {}
