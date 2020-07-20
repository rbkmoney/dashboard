import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { ColoredIconModule } from '../../indicators';
import { NavbarItemComponent } from './navbar-item';
import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [FlexLayoutModule, MatIconModule, ColoredIconModule],
    declarations: [NavbarComponent, NavbarItemComponent],
    exports: [NavbarComponent, NavbarItemComponent],
})
export class NavbarModule {}
