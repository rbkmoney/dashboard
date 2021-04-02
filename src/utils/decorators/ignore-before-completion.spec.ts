import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ignoreBeforeCompletion } from './ignore-before-completion';

describe('ignoreBeforeCompletion', () => {
    it('should be called once', () => {
        let count = 0;

        class Test {
            @ignoreBeforeCompletion
            fn() {
                count += 1;
                return of('Test').pipe(delay(1)).subscribe();
            }
        }

        const test = new Test();
        expect(count).toBe(0);
        test.fn();
        expect(count).toBe(1);
        test.fn();
        expect(count).toBe(1);
    });

    it('should be called twice', () => {
        let count = 0;

        class Test {
            @ignoreBeforeCompletion
            fn() {
                count += 1;
                return of('Test').subscribe();
            }
        }

        const test = new Test();
        expect(count).toBe(0);
        test.fn();
        expect(count).toBe(1);
        test.fn();
        expect(count).toBe(2);
    });
});
