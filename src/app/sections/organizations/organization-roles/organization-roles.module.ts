import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { CollapseModule } from '../../../../components/layout/collapse';
import { LimitedListModule } from '../../../../components/layout/limited-list';
import { OrganizationRolesComponent } from './organization-roles.component';

@NgModule({
    imports: [CommonModule, CollapseModule, LimitedListModule, TranslocoModule, FlexLayoutModule],
    declarations: [OrganizationRolesComponent],
    exports: [OrganizationRolesComponent],
    providers: [],
})
export class OrganizationRolesModule {}
