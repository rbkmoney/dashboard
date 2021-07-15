import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { GlobalBannerModule } from '@dsh/components/global-banner/global-banner.module';
import { AlertModule } from '@dsh/components/layout';

import { TestEnvAlertComponent } from './test-env-alert.component';

@NgModule({
    imports: [GlobalBannerModule, CommonModule, TranslocoModule, AlertModule],
    declarations: [TestEnvAlertComponent],
    exports: [TestEnvAlertComponent],
})
export class TestEnvAlertModule {}
