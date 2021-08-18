import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarModule } from '@dsh/components/navigation';

import { RouteNavbarComponent } from './route-navbar.component';

@NgModule({
    imports: [CommonModule, NavbarModule, RouterModule],
    declarations: [RouteNavbarComponent],
    exports: [RouteNavbarComponent],
})
export class RouteNavbarModule {}
