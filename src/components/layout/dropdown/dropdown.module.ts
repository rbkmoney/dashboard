import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownActionsComponent } from './dropdown-actions';
import { DropdownContentComponent } from './dropdown-content';
import { DropdownTriggerDirective } from './dropdown-trigger.directive';
import { DropdownComponent } from './dropdown.component';

const EXPORTED_DECLARATIONS = [
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownActionsComponent,
    DropdownContentComponent,
];

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule, PortalModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class DropdownModule {}
