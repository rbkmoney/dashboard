import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { DshTabsModule } from '../../../../components/layout/tabs';
import { SearchModule } from '../../../api/search';
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
