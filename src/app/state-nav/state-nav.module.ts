import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { StateNavComponent } from './state-nav.component';
import { StateNavItemComponent } from './state-nav-item/state-nav-item.component';

@NgModule({
    imports: [FlexModule],
    declarations: [StateNavComponent, StateNavItemComponent],
    entryComponents: [],
    exports: [StateNavComponent, StateNavItemComponent]
})
export class StateNavModule {}
