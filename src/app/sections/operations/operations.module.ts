import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';
import { PaymentsComponent } from './payments/payments.component';
import { DshTableModule } from '../../table';
import { LocaleModule } from '../../locale/locale.module';
import { DshButtonToggleModule } from '../../button-toggle';
import { DshTabsModule } from '../../layout/tabs';

@NgModule({
    imports: [
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        DshTableModule,
        LocaleModule,
        DshButtonToggleModule,
        MatIconModule,
        DshTabsModule
    ],
    declarations: [OperationsComponent, PaymentsComponent]
})
export class OperationsModule {}
