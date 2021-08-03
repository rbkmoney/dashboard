import { NgModule } from '@angular/core';

import { ClaimSectionRoutingModule } from './claim-section-routing.module';
import { ClaimSectionComponent } from './claim-section.component';

@NgModule({
    imports: [ClaimSectionRoutingModule],
    declarations: [ClaimSectionComponent],
    exports: [ClaimSectionComponent],
})
export class ClaimSectionModule {}
