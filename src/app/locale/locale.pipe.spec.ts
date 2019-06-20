import { fakeAsync, TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';
import { LocalePipe } from './locale.pipe';

class LocaleServiceStub {
    locale = {
        'test key': 'test value'
    };
}

describe('LocalePipe', () => {
    let lc: LocalePipe;
    let ls: LocaleService;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [LocaleService, { provide: LocaleService, useClass: LocaleServiceStub }],
            declarations: [LocalePipe]
        });
        ls = TestBed.get(LocaleService);
        lc = new LocalePipe(ls);
        spyOn(console, 'warn');
    }));

    it('should return test value', () => {
        expect(lc.transform('test key')).toBe('test value');
    });

    it('should return test key and call warning', () => {
        expect(lc.transform('test_key')).toBe('test_key');
        expect(console.warn).toHaveBeenCalled();
    });
});
