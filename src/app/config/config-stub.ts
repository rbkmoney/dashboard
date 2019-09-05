import { HttpTestingController } from '@angular/common/http/testing';

import config from '../../appConfig.json';

export { config };

export function mockConfig(httpMock: HttpTestingController) {
    const req = httpMock.expectOne('/assets/appConfig.json');
    req.flush(config);
    return req;
}
