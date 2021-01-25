import { NgModule } from '@angular/core';

import { UuidGeneratorModule } from '../../shared';
import { OrganizationsService } from './organizations.service';

@NgModule({
    imports: [UuidGeneratorModule],
    providers: [OrganizationsService],
})
export class OrganizationsModule {}
