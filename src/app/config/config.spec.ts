import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { config, mockConfig } from './config-stub';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    function createService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService],
        });
        const injector = getTestBed();
        const service: ConfigService = injector.inject(ConfigService);
        const httpMock: HttpTestingController = injector.inject(HttpTestingController);
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
