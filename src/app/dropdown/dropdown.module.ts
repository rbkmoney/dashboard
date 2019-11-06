import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from './dropdown.component';
import { DropdownTriggerDirective } from './dropdown-trigger.directive';
import { DropdownActionsComponent } from './dropdown-actions';
import { DropdownContentComponent } from './dropdown-content';

const EXPORTED_DECLARATIONS = [
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownActionsComponent,
    DropdownContentComponent
];

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule, PortalModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS,
    entryComponents: [DropdownComponent]
})
export class DropdownModule {}
