import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import { MobileMenuComponent } from './mobile-menu.component';
import { MobileNavigationModule } from './navigation/mobile-navigation.module';
import { MobileUserBarModule } from './user-bar/mobile-user-bar.module';
import { FeedbackModule } from './feedback/feedback.module';

@NgModule({
    imports: [CommonModule, MobileNavigationModule, MatDividerModule, MobileUserBarModule, FlexModule, FeedbackModule],
    declarations: [MobileMenuComponent],
    exports: [MobileMenuComponent],
})
export class MobileMenuModule {}
