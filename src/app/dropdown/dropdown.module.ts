import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from './dropdown.component';

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule, PortalModule],
    exports: [DropdownComponent],
    declarations: [DropdownComponent],
    entryComponents: [DropdownComponent],
    providers: []
})
export class DropdownModule {}
