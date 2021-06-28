import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationsComponent } from './integrations.component';

@NgModule({
    imports: [
        IntegrationsRoutingModule,
        CommonModule,
        FlexModule,
        LayoutModule,
        TranslocoModule,
        ScrollUpModule,
        MatTabsModule,
    ],
    declarations: [IntegrationsComponent],
})
export class IntegrationsModule {}
