import { NgModule } from '@angular/core';

import { OrganizationsConfigService } from './organizations-config.service';
import { ApiModule, Configuration } from './swagger-codegen';

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
