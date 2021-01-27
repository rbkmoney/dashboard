import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { DshTabsModule, HeadlineModule } from '../../../../components/layout';
import { OrganizationManagementService } from '../services/organization-management/organization-management.service';
import { OrganizationDetailsRoutingModule } from './organization-details-routing.module';
import { OrganizationDetailsComponent } from './organization-details.component';

@NgModule({
    imports: [
        OrganizationDetailsRoutingModule,
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        HeadlineModule,
        DshTabsModule,
    ],
    declarations: [OrganizationDetailsComponent],
    exports: [OrganizationDetailsComponent],
    providers: [OrganizationManagementService],
})
export class OrganizationDetailsModule {}
