import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DefaultService } from './swagger-codegen/api/default.service';
import { BASE_PATH, Configuration } from './swagger-codegen';

@Injectable()
export class GetQuestionaryService extends DefaultService {
    constructor(
        protected httpClient: HttpClient,
        @Optional() @Inject(BASE_PATH) basePath: string,
        @Optional() configuration: Configuration
    ) {
        super(httpClient, basePath, configuration);
        this.defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }
}
