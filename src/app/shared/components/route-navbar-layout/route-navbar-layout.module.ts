import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { RouteNavbarLayoutComponent } from './route-navbar-layout.component';

@NgModule({
    imports: [CommonModule, RouterModule, FlexLayoutModule],
    declarations: [RouteNavbarLayoutComponent],
    exports: [RouteNavbarLayoutComponent],
})
export class RouteNavbarLayoutModule {}
