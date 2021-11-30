import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { SectionsLinksModule } from '@dsh/app/shared/services/sections-links';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { MobileMenuFeedbackItemComponent, MobileUserBarComponent, NavItemComponent } from './components';
import { MobileMenuComponent } from './mobile-menu.component';

@NgModule({
    imports: [
        CommonModule,
        MatDividerModule,
        FlexModule,
        SectionsLinksModule,
        RouterModule,
        TranslocoModule,
        BootstrapIconModule,
    ],
    declarations: [MobileMenuComponent, NavItemComponent, MobileMenuFeedbackItemComponent, MobileUserBarComponent],
    exports: [MobileMenuComponent],
})
export class MobileMenuModule {}
