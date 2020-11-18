import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';

const EXPORTED_DECLARATIONS = [OrganizationsComponent];

@NgModule({
    imports: [OrganizationsRoutingModule, TranslocoModule, FlexLayoutModule, LayoutModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class OrganizationsModule {}
