import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
    NgxBootstrapIconsModule,
    pieChart,
    layoutTextSidebar,
    arrowRightCircle,
    fileText,
    plug,
    toggles2,
    wallet2,
    arrowDownRightCircle,
    arrowUpRightCircle,
} from 'ngx-bootstrap-icons';

import { NavbarItemComponent } from './navbar-item.component';

const ICONS = {
    pieChart,
    layoutTextSidebar,
    arrowRightCircle,
    fileText,
    plug,
    toggles2,
    wallet2,
    arrowDownRightCircle,
    arrowUpRightCircle,
};

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule, MatSlideToggleModule, NgxBootstrapIconsModule.pick(ICONS)],
    declarations: [NavbarItemComponent],
    exports: [NavbarItemComponent],
})
export class NavbarItemModule {}
