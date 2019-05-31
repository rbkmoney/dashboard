import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../layout';
import { DshButtonModule } from '../../button';

@NgModule({
    imports: [LayoutModule, FlexLayoutModule, DshButtonModule],
    declarations: [OperationsComponent]
})
export class OperationsModule {}
