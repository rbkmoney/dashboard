import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { CollapseModule, LimitedListModule } from '@dsh/components/layout';

import { OrganizationRolesComponent } from './organization-roles.component';

@NgModule({
    imports: [CommonModule, CollapseModule, LimitedListModule, TranslocoModule, FlexLayoutModule],
    declarations: [OrganizationRolesComponent],
    exports: [OrganizationRolesComponent],
})
export class OrganizationRolesModule {}
