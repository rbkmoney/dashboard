import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';

@NgModule({
    imports: [
        ApiModule.forRoot(
            () =>
                new Configuration({
                    apiKeys: { Authorization: 'Bearer KEY' },
                    basePath: 'http://localhost:8000'
                })
        )
    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class CAPIModule {}
