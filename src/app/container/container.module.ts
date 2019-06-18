import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';
import { LocaleModule } from '../locale/locale.module';

@NgModule({
    imports: [ToolbarModule, RouterModule, LocaleModule],
    declarations: [ContainerComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
