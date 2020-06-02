import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { StateNavModule } from '@dsh/components/navigation';

import { NavComponent } from './nav';
import { StatusToColorPipe } from './status-to-color.pipe';
import { WalletSectionRoutingModule } from './wallet-section-routing.module';
import { WalletSectionComponent } from './wallet-section.component';

@NgModule({
    imports: [
        CommonModule,
        WalletSectionRoutingModule,
        StateNavModule,
        MatIconModule,
        FlexLayoutModule,
        TranslocoModule,
    ],
    declarations: [WalletSectionComponent, NavComponent, StatusToColorPipe],
    exports: [StatusToColorPipe],
})
export class WalletSectionModule {}
