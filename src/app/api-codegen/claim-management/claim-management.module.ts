import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { ClaimManagementConfigService } from './claim-management-config.service';
import { ClaimsService } from './claims.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: ClaimManagementConfigService }]
        }
    ],
    providers: [ClaimManagementConfigService, ClaimsService]
})
export class ClaimManagementModule {}
