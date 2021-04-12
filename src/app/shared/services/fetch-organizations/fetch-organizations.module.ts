import { NgModule } from '@angular/core';

import { FetchOrganizationsService } from './fetch-organizations.service';

@NgModule({
    providers: [FetchOrganizationsService],
})
export class FetchOrganizationsModule {}
