import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { SearchModule } from '../../../api/search';
import { LayoutModule } from '../../../layout';
import { DshTabsModule } from '../../../layout/tabs';
import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';

@NgModule({
    imports: [
        CommonModule,
        OperationsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        DshTabsModule,
        SearchModule,
        TranslocoModule
    ],
    declarations: [OperationsComponent]
})
export class OperationsModule {}
