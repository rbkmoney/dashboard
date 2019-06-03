import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { A11yModule } from '@angular/cdk/a11y';

import { DshTabComponent } from './tab.component';
import { DshTabGroupComponent } from './tab-group.component';
import { DshTabHeaderComponent } from './tab-header.component';
import { DshTabBodyComponent, DshTabBodyPortalDirective } from './tab-body.component';
import { DshTabLabelDirective } from './tab-label.directive';
import { DshTabContentDirective } from './tab-content.directive';
import { DshInkBarDirective } from './ink-bar.directive';



@NgModule({
    imports: [
        CommonModule,
        MatCommonModule,
        PortalModule,
        MatRippleModule,
        ObserversModule,
        A11yModule
    ],
    // Don't export all components because some are only to be used internally.
    exports: [
        DshTabGroupComponent,
        DshTabComponent,
        DshTabHeaderComponent,
        DshTabBodyComponent
    ],
    declarations: [
        DshTabGroupComponent,
        DshTabComponent,
        DshTabHeaderComponent,
        DshTabBodyComponent,
        DshTabBodyPortalDirective,
        DshTabLabelDirective,
        DshTabContentDirective,
        DshInkBarDirective
    ]
})
export class DshTabsModule {}
