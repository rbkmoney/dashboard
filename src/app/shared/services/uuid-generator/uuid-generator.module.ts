import { NgModule } from '@angular/core';

import { UuidGeneratorService } from './uuid-generator.service';

@NgModule({
    providers: [UuidGeneratorService],
})
export class UuidGeneratorModule {}
