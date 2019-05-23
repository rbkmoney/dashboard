import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';

import { CardModule } from './card';
import { LayoutComponent } from './layout.component';
import { ToolbarModule } from '../toolbar';
import { LayoutService } from './layout.service';
import { HeadlineModule } from './headline/headline.module';

@NgModule({
    imports: [CardModule, ToolbarModule, RouterModule, FlexModule, CommonModule, HeadlineModule],
    declarations: [LayoutComponent],
    exports: [CardModule, HeadlineModule, LayoutComponent],
    providers: [LayoutService]
})
export class LayoutModule {}
