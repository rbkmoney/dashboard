import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { GlobalBannerModule } from '@dsh/components/global-banner/global-banner.module';

import { TestEnvBannerComponent } from './test-env-banner.component';

@NgModule({
    imports: [GlobalBannerModule, CommonModule, TranslocoModule],
    declarations: [TestEnvBannerComponent],
    exports: [TestEnvBannerComponent],
})
export class TestEnvBannerModule {}
