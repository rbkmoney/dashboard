import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { BrandModule } from '../brand';
import { MobileMenuModule } from './menu/mobile-menu.module';
import { MobileGridComponent } from './mobile-grid.component';

@NgModule({
    imports: [CommonModule, MatSidenavModule, MatIconModule, BrandModule, FlexLayoutModule, MobileMenuModule],
    declarations: [MobileGridComponent],
    exports: [MobileGridComponent],
})
export class MobileGridModule {}
