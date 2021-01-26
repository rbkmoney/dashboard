import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';

import { AccordionModule, CardModule, HeadlineModule, RowModule } from '../../../../components/layout';
import { OrganizationRolesModule } from '../organization-roles';
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
        EmptySearchResultModule,
        AccordionModule,
        CardModule,
        RowModule,
        SpinnerModule,
        MatDividerModule,
        OrganizationRolesModule,
        ButtonModule,
    ],
    declarations: [OrganizationDetailsComponent],
    exports: [OrganizationDetailsComponent],
    providers: [OrganizationManagementService],
})
export class OrganizationDetailsModule {}
