import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ScrollUpModule } from '../../../../components/navigation';
import { OrganizationDetailsRoutingModule } from './organization-details-routing.module';
import { OrganizationDetailsComponent } from './organization-details.component';

@NgModule({
    imports: [OrganizationDetailsRoutingModule, CommonModule, FlexLayoutModule, TranslocoModule, ScrollUpModule],
    declarations: [OrganizationDetailsComponent],
    exports: [OrganizationDetailsComponent],
    providers: [],
})
export class OrganizationDetailsModule {}
