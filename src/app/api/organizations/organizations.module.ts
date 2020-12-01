import { NgModule } from '@angular/core';

import { OrganizationsService } from './services/organizations.service';

const EXPORTED_DECLARATIONS = [];

@NgModule({
    imports: [],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [OrganizationsService],
})
export class OrganizationsModule {}
