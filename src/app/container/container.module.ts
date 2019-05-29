import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';

@NgModule({
    imports: [ToolbarModule, RouterModule],
    declarations: [ContainerComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
