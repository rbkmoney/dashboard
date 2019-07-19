import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocaleDictionaryService } from './locale-dictionary.service';
import { SettingsService } from '../../settings/settings.service';

class SettingsServiceStub {
    get language() {
        return 'ru';
    }
}

const dummyDict = {
    'test key': 'test value'
};

describe('LocaleDictionaryService', () => {
    async function createService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LocaleDictionaryService, { provide: SettingsService, useClass: SettingsServiceStub }]
        });
        const ls = TestBed.get(LocaleDictionaryService);
        const httpMock = TestBed.get(HttpTestingController);
        const load = ls.init({ localesUrl: '/assets/locales' });
        const req = httpMock.expectOne(`/assets/locales/ru.json`);
        req.flush(dummyDict);
        await load;
        return { ls, httpMock, req };
    }

    it('should return config', async done => {
        const { req } = await createService();
        expect(req.request.method).toBe('GET');
        done();
    });

    it('should return test value', async done => {
        expect((await createService()).ls.mapDictionaryKey('test key')).toBe('test value');
        done();
    });

    it('should return test key and call warning', async done => {
        spyOn(console, 'warn');
        expect((await createService()).ls.mapDictionaryKey('test_key')).toBe('test_key');
        expect(console.warn).toHaveBeenCalled();
        done();
    });
});
