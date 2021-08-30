import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { RouteNavbarModule } from '@dsh/app/shared/components/route-navbar';
import { RouteNavbarLayoutModule } from '@dsh/app/shared/components/route-navbar-layout';

import { StatusToColorPipe } from './status-to-color.pipe';
import { WalletSectionRoutingModule } from './wallet-section-routing.module';
import { WalletSectionComponent } from './wallet-section.component';

@NgModule({
    imports: [
        CommonModule,
        WalletSectionRoutingModule,
        MatIconModule,
        FlexLayoutModule,
        TranslocoModule,
        RouteNavbarModule,
        RouteNavbarLayoutModule,
    ],
    declarations: [WalletSectionComponent, StatusToColorPipe],
    exports: [StatusToColorPipe],
})
export class WalletSectionModule {}
