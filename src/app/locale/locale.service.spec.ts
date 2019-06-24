import { fakeAsync, TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingsService } from '../settings';

class SettingsServiceStub {
    get language() {
        return 'ru';
    }
}

const dummyDict = {
    'test key': 'test value'
};

describe('LocaleService', () => {
    let ls: LocaleService;
    let httpMock: HttpTestingController;
    beforeAll(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LocaleService, { provide: SettingsService, useClass: SettingsServiceStub }]
        });
        ls = TestBed.get(LocaleService);
        spyOn(console, 'warn');
        ls = TestBed.get(LocaleService);
        httpMock = TestBed.get(HttpTestingController);

        ls.init().then(() => {});
        const req = httpMock.expectOne(`/assets/locales/ru.json`, 'get the dictionary');
        req.flush(dummyDict);
        expect(req.request.method).toBe('GET');
    }));

    it('should return test value', () => {
        expect(ls.mapDictionaryKey('test key')).toBe('test value');
    });

    it('should return test key and call warning', () => {
        expect(ls.mapDictionaryKey('test_key')).toBe('test_key');
        expect(console.warn).toHaveBeenCalled();
    });
});
