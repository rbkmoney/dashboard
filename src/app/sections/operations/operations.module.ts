import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';
import { PaymentsComponent } from './payments/payments.component';
import { TableModule } from '../../table';
import { ButtonToggleModule } from '../../button-toggle';
import { DshTabsModule } from '../../layout/tabs';
import { LocaleModule } from '../../locale/locale.module';

@NgModule({
    imports: [
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TableModule,
        ButtonToggleModule,
        MatIconModule,
        DshTabsModule,
        LocaleModule
    ],
    declarations: [OperationsComponent, PaymentsComponent]
})
export class OperationsModule {}
