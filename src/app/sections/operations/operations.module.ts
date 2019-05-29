import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../layout';

@NgModule({
    imports: [LayoutModule, FlexLayoutModule],
    declarations: [OperationsComponent]
})
export class OperationsModule {}
