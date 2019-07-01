import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../../layout';
import { DshTabsModule } from '../../../layout/tabs';
import { LocaleModule } from '../../../locale';
import { OperationsRoutingModule } from './operations-routing.module';

@NgModule({
    imports: [
        CommonModule,
        OperationsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        DshTabsModule,
        LocaleModule,
        MatTabsModule
    ],
    declarations: [OperationsComponent]
})
export class OperationsModule {}
