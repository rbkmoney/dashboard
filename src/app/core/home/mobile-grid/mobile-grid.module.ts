import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import cloneDeep from 'lodash.clonedeep';

import { BrandModule } from '../brand';
import { MOBILE_MENU, MOBILE_MENU_TOKEN } from './consts';
import { MobileMenuModule } from './menu/mobile-menu.module';
import { MobileGridComponent } from './mobile-grid.component';

@NgModule({
    imports: [CommonModule, MatSidenavModule, MatIconModule, BrandModule, FlexLayoutModule, MobileMenuModule],
    declarations: [MobileGridComponent],
    exports: [MobileGridComponent],
    providers: [
        {
            provide: MOBILE_MENU_TOKEN,
            useValue: cloneDeep(MOBILE_MENU),
        },
    ],
})
export class MobileGridModule {}
