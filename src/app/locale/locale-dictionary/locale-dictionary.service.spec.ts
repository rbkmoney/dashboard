import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocaleDictionaryService } from './locale-dictionary.service';
import { LanguageService } from '../../languge';

class LanguageServiceStub {
    get language() {
        return 'ru';
    }
}

const dummyDict = {
    'test key': 'test value',
    template_test_key: 'test <%- replacement %> value'
};

describe('LocaleDictionaryService', () => {
    async function createService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LocaleDictionaryService, { provide: LanguageService, useClass: LanguageServiceStub }]
        });
        const ls: LocaleDictionaryService = TestBed.get(LocaleDictionaryService);
        const httpMock = TestBed.get(HttpTestingController);
        const load = ls.init({ ru: '/assets/locales/ru.json' });
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

    it('should return template test value', async done => {
        expect((await createService()).ls.mapDictionaryKey('template_test_key', { replacement: 'sample' })).toBe(
            'test sample value'
        );
        done();
    });

    it('should return test key and call warning', async done => {
        spyOn(console, 'warn');
        expect((await createService()).ls.mapDictionaryKey('test_key')).toBe('test_key');
        expect(console.warn).toHaveBeenCalled();
        done();
    });
});
