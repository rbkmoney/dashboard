import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { IndicatorsModule } from '@dsh/components/indicators';
import { AccordionModule, DetailsItemModule, LayoutModule } from '@dsh/components/layout';
import { NavigationLinkModule } from '@dsh/components/navigation-link';

import { ButtonModule } from '../../../components/buttons';
import { EmptySearchResultModule } from '../../../components/empty-search-result';
import { SpinnerModule } from '../../../components/indicators';
import { CollapseModule } from '../../../components/layout/collapse';
import { LimitedListModule } from '../../../components/layout/limited-list';
import { ScrollUpModule } from '../../../components/navigation';
import { ShowMorePanelModule } from '../../../components/show-more-panel';
import { OrganizationsModule as OrganizationsAPIModule } from '../../api/organizations';
import { UserModule } from '../../shared';
import { OrganizationRolesComponent } from './components/organization-roles/organization-roles.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';

const EXPORTED_DECLARATIONS = [
    OrganizationsComponent,
    OrganizationsListComponent,
    OrganizationComponent,
    OrganizationRolesComponent,
];

@NgModule({
    imports: [
        CommonModule,
        OrganizationsRoutingModule,
        TranslocoModule,
        FlexLayoutModule,
        LayoutModule,
        ScrollUpModule,
        ShowMorePanelModule,
        EmptySearchResultModule,
        SpinnerModule,
        ButtonModule,
        AccordionModule,
        CollapseModule,
        LimitedListModule,
        OrganizationsAPIModule,
        MatDividerModule,
        DetailsItemModule,
        NavigationLinkModule,
        IndicatorsModule,
        UserModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [FetchOrganizationsService],
})
export class OrganizationsModule {}
