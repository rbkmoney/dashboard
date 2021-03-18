import { NgModule } from '@angular/core';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemComponent } from './breadcrumb-item';

@NgModule({
    declarations: [BreadcrumbComponent, BreadcrumbItemComponent],
    exports: [BreadcrumbComponent, BreadcrumbItemComponent],
})
export class BreadcrumbModule {}
