import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { ButtonModule } from '@dsh/components/buttons';
import { ColorIconModule } from '@dsh/components/color-icon/color-icon.module';

import { GlobalBannerComponent } from './global-banner.component';

@NgModule({
    declarations: [GlobalBannerComponent],
    imports: [CommonModule, FlexModule, ButtonModule, MatIconModule, ColorIconModule],
    exports: [GlobalBannerComponent],
})
export class GlobalBannerModule {}
