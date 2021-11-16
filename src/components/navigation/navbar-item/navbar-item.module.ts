import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NavbarItemComponent } from './navbar-item.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule, MatSlideToggleModule],
    declarations: [NavbarItemComponent],
    exports: [NavbarItemComponent],
})
export class NavbarItemModule {}
