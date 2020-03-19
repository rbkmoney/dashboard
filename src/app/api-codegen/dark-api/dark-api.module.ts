import { NgModule } from '@angular/core';

import { KeycloakService } from '../../auth/keycloak/keycloak.service';
import { DarkApiConfigService } from './dark-api-config.service';
import { FilesService } from './files.service';
import { ApiModule, Configuration } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: DarkApiConfigService }]
        }
    ],
    providers: [DarkApiConfigService, FilesService, KeycloakService]
})
export class DarkApiModule {}
