import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { FilesService } from './files.service';
import { DarkApiConfigService } from './dark-api-config.service';
import { KeycloakService } from '../../auth/keycloak/keycloak.service';

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
