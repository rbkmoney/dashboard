import { HttpTestingController } from '@angular/common/http/testing';

import { Config } from './config';

export const config: Config = {
    api: {
        capiEndpoint: 'http://localhost:8000'
    },
    daData: {
        token: 'Token XXX',
        suggestionsApiUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest'
    },
    konturFocus: {
        apiV3Url: 'https://focus-api.kontur.ru/api3'
    }
};

export function mockConfig(httpMock: HttpTestingController) {
    const req = httpMock.expectOne('/assets/appConfig.json');
    req.flush(config);
    return req;
}
