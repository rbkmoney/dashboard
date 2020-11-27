import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { AccordionModule, LayoutModule } from '@dsh/components/layout';

import { ButtonModule } from '../../../components/buttons';
import { EmptySearchResultModule } from '../../../components/empty-search-result';
import { SpinnerModule } from '../../../components/indicators';
import { CollapseModule } from '../../../components/layout/collapse';
import { LimitedListModule } from '../../../components/layout/limited-list';
import { ScrollUpModule } from '../../../components/navigation';
import { ShowMorePanelModule } from '../../../components/show-more-panel';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';

const EXPORTED_DECLARATIONS = [OrganizationsComponent, OrganizationsListComponent];

@NgModule({
    imports: [
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
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class OrganizationsModule {}
