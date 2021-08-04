import { NgModule } from '@angular/core';

import { OrginizationSectionRoutingModule } from './organization-section-routing.module';
import { OrginizationSectionComponent } from './organization-section.component';

@NgModule({
    imports: [OrginizationSectionRoutingModule],
    declarations: [OrginizationSectionComponent],
    exports: [OrginizationSectionComponent],
})
export class OrginizationSectionModule {}
