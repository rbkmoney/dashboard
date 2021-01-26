import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';

@NgModule({
    imports: [CommonModule, OrganizationsRoutingModule, FlexModule, TranslocoModule],
    declarations: [OrganizationsComponent],
})
export class OrganizationsModule {}
