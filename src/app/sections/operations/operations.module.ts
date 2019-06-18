import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';
import { PaymentsComponent } from './payments/payments.component';
import { DshTableModule } from '../../table';
import { LocalePipe } from '../../translation/translation.pipe';

@NgModule({
    imports: [LayoutModule, FlexLayoutModule, ButtonModule, MatFormFieldModule, MatInputModule, DshTableModule],
    exports: [
        LocalePipe
    ],
    declarations: [OperationsComponent, PaymentsComponent, LocalePipe]
})
export class OperationsModule {}
