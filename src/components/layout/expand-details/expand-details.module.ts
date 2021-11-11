import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { ExpandDetailsHeaderComponent } from './components';
import { ExpandDetailsContentDirective } from './directives';
import { ExpandDetailsComponent } from './expand-details.component';

const EXPORTED_DECLARATIONS = [ExpandDetailsComponent, ExpandDetailsHeaderComponent, ExpandDetailsContentDirective];

@NgModule({
    imports: [CommonModule, MatIconModule, PortalModule, FlexModule],
    declarations: [...EXPORTED_DECLARATIONS],
    exports: EXPORTED_DECLARATIONS,
})
export class ExpandDetailsModule {}
