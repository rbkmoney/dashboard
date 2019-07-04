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
import { DshTabLabelWrapperDirective } from './tab-label-wrapper.directive';
import { TabLinkDirective, TabNavComponent } from './tab-nav-bar';

@NgModule({
    imports: [CommonModule, MatCommonModule, PortalModule, MatRippleModule, ObserversModule, A11yModule],
    exports: [
        DshTabGroupComponent,
        DshTabComponent,
        DshTabHeaderComponent,
        DshTabBodyComponent,
        TabNavComponent,
        TabLinkDirective
    ],
    declarations: [
        DshTabGroupComponent,
        DshTabComponent,
        DshTabHeaderComponent,
        DshTabBodyComponent,
        DshTabBodyPortalDirective,
        DshTabLabelDirective,
        DshTabContentDirective,
        DshInkBarDirective,
        DshTabLabelWrapperDirective,
        TabNavComponent,
        TabLinkDirective
    ]
})
export class DshTabsModule {}
