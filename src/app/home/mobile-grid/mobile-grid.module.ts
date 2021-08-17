import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { BrandModule } from '../brand';
import { MobileGridComponent } from './mobile-grid.component';
import { MobileMenuModule } from './mobile-menu/mobile-menu.module';

@NgModule({
    imports: [CommonModule, MatSidenavModule, MatIconModule, BrandModule, FlexLayoutModule, MobileMenuModule],
    declarations: [MobileGridComponent],
    exports: [MobileGridComponent],
})
export class MobileGridModule {}
