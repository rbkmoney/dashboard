import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { config, mockConfig } from './config-stub.js';
import { ConfigService } from './config.service.js';

describe('ConfigService', () => {
    function createService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService],
        });
        const injector = getTestBed();
        // tslint:disable-next-line: deprecation
        const service: ConfigService = injector.get(ConfigService);
        // tslint:disable-next-line: deprecation
        const httpMock: HttpTestingController = injector.get(HttpTestingController);
        return { injector, service, httpMock };
    }

    it('should load config', () => {
        const { service, httpMock } = createService();
        service.init({ configUrl: '/assets/appConfig.json' }).then(() => {
            for (const [k, v] of Object.entries(config)) {
                expect(service[k]).toEqual(v);
            }
        });
        const req = mockConfig(httpMock);
        expect(req.request.method).toBe('GET');
    });
});
