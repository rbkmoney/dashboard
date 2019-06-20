import { fakeAsync, TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';
import { LocalePipe } from './locale.pipe';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings';

class HttpClientStub {}
class SettingsServiceStub {}

describe('LocalePipe', () => {
    let lc: LocalePipe;
    let ls: LocaleService;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                LocaleService,
                { provide: HttpClient, useClass: HttpClientStub },
                { provide: SettingsService, useClass: SettingsServiceStub }
            ],
            declarations: [LocalePipe]
        });
        ls = TestBed.get(LocaleService);
        ls.locale = {
            'test key': 'test value'
        };
        lc = new LocalePipe(ls);
        spyOn(console, 'warn');
        TestBed.compileComponents();
    }));

    it('should return test value', () => {
        expect(lc.transform('test key')).toBe('test value');
    });

    it('should return test key and call warning', () => {
        expect(lc.transform('test_key')).toBe('test_key');
        expect(console.warn).toHaveBeenCalled();
    });
});
