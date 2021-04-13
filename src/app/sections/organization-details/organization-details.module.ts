import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { OrganizationManagementModule } from '@dsh/app/shared/services/organization-management/organization-management.module';
import { IndicatorsModule } from '@dsh/components/indicators';
import { DshTabsModule } from '@dsh/components/layout';
import { BreadcrumbModule } from '@dsh/components/navigation';

import { OrganizationDetailsRoutingModule } from './organization-details-routing.module';
import { OrganizationDetailsComponent } from './organization-details.component';

@NgModule({
    imports: [
        OrganizationDetailsRoutingModule,
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        DshTabsModule,
        BreadcrumbModule,
        IndicatorsModule,
        OrganizationManagementModule,
    ],
    declarations: [OrganizationDetailsComponent],
    exports: [OrganizationDetailsComponent],
})
export class OrganizationDetailsModule {}
