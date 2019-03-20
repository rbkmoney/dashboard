import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownComponent } from './dropdown.component';
import { DropdownService } from './dropdown.service';

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule, PortalModule, BrowserAnimationsModule],
    exports: [DropdownComponent],
    declarations: [DropdownComponent],
    entryComponents: [DropdownComponent],
    providers: [DropdownService]
})
export class DropdownModule {}
