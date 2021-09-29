import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { WalletsListModule } from './wallets-list';
import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './wallets.component';

@NgModule({
    imports: [
        WalletsRoutingModule,
        ScrollUpModule,
        TranslocoModule,
        FlexModule,
        ShowMorePanelModule,
        CommonModule,
        SpinnerModule,
        EmptySearchResultModule,
        WalletsListModule,
    ],
    declarations: [WalletsComponent],
})
export class WalletsModule {}
