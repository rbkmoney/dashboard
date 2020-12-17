import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '../../../../components/buttons';
import { EmptySearchResultModule } from '../../../../components/empty-search-result';
import { SpinnerModule } from '../../../../components/indicators';
import { LastUpdatedModule } from '../../../../components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, HeadlineModule, RowModule } from '../../../../components/layout';
import { ScrollUpModule } from '../../../../components/navigation';
import { ShowMorePanelModule } from '../../../../components/show-more-panel';
import { OrganizationRolesModule } from '../organization-roles';
import { FetchOrganizationMemberService } from '../services/fetch-organization-member/fetch-organization-member.service';
import { MemberComponent } from './components/member/member.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { OrganizationDetailsRoutingModule } from './organization-details-routing.module';
import { OrganizationDetailsComponent } from './organization-details.component';

@NgModule({
    imports: [
        OrganizationDetailsRoutingModule,
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        ScrollUpModule,
        HeadlineModule,
        EmptySearchResultModule,
        AccordionModule,
        ShowMorePanelModule,
        LastUpdatedModule,
        CardModule,
        RowModule,
        SpinnerModule,
        MatDividerModule,
        OrganizationRolesModule,
        ButtonModule,
    ],
    declarations: [OrganizationDetailsComponent, MembersListComponent, MemberComponent],
    exports: [OrganizationDetailsComponent],
    providers: [FetchOrganizationMemberService],
})
export class OrganizationDetailsModule {}
