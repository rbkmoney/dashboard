import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { NavigationLinkComponent } from './navigation-link.component';

@NgModule({
    declarations: [NavigationLinkComponent],
    imports: [MatIconModule, FlexModule],
    exports: [NavigationLinkComponent],
})
export class NavigationLinkModule {}
