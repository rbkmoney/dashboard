import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { NavigationLinkComponent } from './navigation-link.component';

@NgModule({
    declarations: [NavigationLinkComponent],
    imports: [FlexModule],
    exports: [NavigationLinkComponent],
})
export class NavigationLinkModule {}
