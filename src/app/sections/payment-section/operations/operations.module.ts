import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../../layout';
import { DshTabsModule } from '../../../layout/tabs';
import { LocaleModule } from '../../../locale';
import { OperationsRoutingModule } from './operations-routing.module';
import { SearchModule } from '../../../api/search';

@NgModule({
    imports: [
        CommonModule,
        OperationsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        DshTabsModule,
        LocaleModule,
        SearchModule,
        TranslocoModule
    ],
    declarations: [OperationsComponent]
})
export class OperationsModule {}
