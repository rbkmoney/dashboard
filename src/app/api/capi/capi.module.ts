import { NgModule } from '@angular/core';

import { CAPIClaimsService } from './capi-claims.service';
import { CAPIPartiesService } from './capi-parties.service';

@NgModule({
    providers: [CAPIClaimsService, CAPIPartiesService],
})
export class CapiModule {}
