import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './openapi-codegen';
import { OrganizationsConfigService } from './organizations-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: OrganizationsConfigService }],
        },
    ],
    providers: [OrganizationsConfigService],
})
export class OrganizationsModule {}
