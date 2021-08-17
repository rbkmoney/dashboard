import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { SectionsLinksModule } from '@dsh/app/shared/services/sections-links';

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
        MatIconModule,
    ],
    declarations: [MobileMenuComponent, NavItemComponent, MobileMenuFeedbackItemComponent, MobileUserBarComponent],
    exports: [MobileMenuComponent],
})
export class MobileMenuModule {}
