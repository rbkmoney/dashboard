import { NgModule } from '@angular/core';

import { CapiClaimsService } from './capi-claims.service';
import { CAPIPartiesService } from './capi-parties.service';

@NgModule({
    providers: [CapiClaimsService, CAPIPartiesService],
})
export class CapiModule {}
