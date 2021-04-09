import { NgModule } from '@angular/core';

import { IdGeneratorModule } from '../../shared';
import { OrganizationsService } from './organizations.service';

@NgModule({
    imports: [IdGeneratorModule],
    providers: [OrganizationsService],
})
export class OrganizationsModule {}
