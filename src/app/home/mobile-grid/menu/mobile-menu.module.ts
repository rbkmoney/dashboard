import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

import { SectionsLinksModule } from '@dsh/app/shared/services/sections-links';

import { NavItemComponent } from './components';
import { FeedbackModule } from './feedback/feedback.module';
import { MobileMenuComponent } from './mobile-menu.component';
import { MobileNavigationModule } from './navigation/mobile-navigation.module';
import { MobileUserBarModule } from './user-bar/mobile-user-bar.module';

@NgModule({
    imports: [
        CommonModule,
        MobileNavigationModule,
        MatDividerModule,
        MobileUserBarModule,
        FlexModule,
        FeedbackModule,
        SectionsLinksModule,
        RouterModule,
    ],
    declarations: [MobileMenuComponent, NavItemComponent],
    exports: [MobileMenuComponent],
})
export class MobileMenuModule {}
