import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { ButtonModule } from '@dsh/components/buttons';
import { ColoredIconModule } from '@dsh/components/indicators';

import { GlobalBannerComponent } from './global-banner.component';

@NgModule({
    declarations: [GlobalBannerComponent],
    imports: [CommonModule, FlexModule, ButtonModule, MatIconModule, ColoredIconModule],
    exports: [GlobalBannerComponent],
})
export class GlobalBannerModule {}
