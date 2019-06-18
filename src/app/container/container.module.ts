import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';
import { OperationsModule } from '../sections/operations/operations.module';

@NgModule({
    imports: [ToolbarModule, RouterModule, OperationsModule],
    declarations: [ContainerComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
