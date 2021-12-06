import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';

import { BootstrapIconModule } from '@dsh/components/indicators';
import { AlertModule } from '@dsh/components/layout';

import { TestEnvAlertComponent } from './test-env-alert.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, AlertModule, FlexModule, BootstrapIconModule, MatTooltipModule],
    declarations: [TestEnvAlertComponent],
    exports: [TestEnvAlertComponent],
})
export class TestEnvAlertModule {}
