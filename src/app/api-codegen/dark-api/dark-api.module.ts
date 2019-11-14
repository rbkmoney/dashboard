import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { DarkApiConfigService } from './dark-api-config.service';
import { FilesService } from './files.service';


@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: DarkApiConfigService }]
        }
    ],
    providers: [DarkApiConfigService, FilesService]
})
export class DarkApiModule {}
