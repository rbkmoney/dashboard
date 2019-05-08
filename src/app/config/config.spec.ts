import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConfigService } from './config.service.js';
import { mockConfig, config } from './config-stub.js';

describe('ConfigService', () => {
    function createService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService]
        });
        const injector = getTestBed();
        const service: ConfigService = injector.get(ConfigService);
        const httpMock: HttpTestingController = injector.get(HttpTestingController);
        return { injector, service, httpMock };
    }

    it('should load config', () => {
        const { service, httpMock } = createService();
        service.init().then(() => {
            for (const [k, v] of Object.entries(config)) {
                expect(service[k]).toEqual(v);
            }
        });
        const req = mockConfig(httpMock);
        expect(req.request.method).toBe('GET');
    });
});
