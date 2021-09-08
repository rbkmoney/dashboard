import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { DetailsItemModule } from '@dsh/components/layout';

import { WalletsMainInfoComponent } from './wallets-main-info.component';

@NgModule({
    imports: [CommonModule, FlexModule, DetailsItemModule, TranslocoModule],
    declarations: [WalletsMainInfoComponent],
    exports: [WalletsMainInfoComponent],
})
export class WalletsMainInfoModule {}
