import { NgModule } from '@angular/core';

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationsComponent } from './integrations.component';
import { FlexModule } from '@angular/flex-layout';
import { LayoutModule } from '@dsh/components/layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ScrollUpModule } from '@dsh/components/navigation';

@NgModule({
    imports: [IntegrationsRoutingModule, CommonModule, FlexModule, LayoutModule, TranslocoModule, ScrollUpModule],
    declarations: [IntegrationsComponent]
})
export class IntegrationsModule {}
