import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';

@NgModule({
    imports: [LayoutModule, FlexLayoutModule, ButtonModule],
    declarations: [OperationsComponent]
})
export class OperationsModule {}
