import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../../layout';
import { DshTabsModule } from '../../../layout/tabs';
import { LocaleModule } from '../../../locale';
import { OperationsRoutingModule } from './operations-routing.module';
import { LastUpdatedComponent } from './last-updated/last-updated.component';
import { FromMinorPipe } from './from-minor.pipe';

@NgModule({
    imports: [CommonModule, OperationsRoutingModule, LayoutModule, FlexLayoutModule, DshTabsModule, LocaleModule],
    declarations: [OperationsComponent, LastUpdatedComponent, FromMinorPipe],
    exports: [LastUpdatedComponent, FromMinorPipe]
})
export class OperationsModule {}
