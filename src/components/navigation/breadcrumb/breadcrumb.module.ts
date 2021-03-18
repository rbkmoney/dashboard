import { NgModule } from '@angular/core';

import { BreadcrumbItemComponent } from './breadcrumb-item';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
    declarations: [BreadcrumbComponent, BreadcrumbItemComponent],
    exports: [BreadcrumbComponent, BreadcrumbItemComponent],
})
export class BreadcrumbModule {}
