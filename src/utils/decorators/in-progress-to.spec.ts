import { BehaviorSubject, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { inProgressTo } from './in-progress-to';

describe('inProgressTo', () => {
    it('should work', (done) => {
        class Test {
            inProgress$ = new BehaviorSubject(false);
            @inProgressTo('inProgress$')
            fn() {
                return of('Test')
                    .pipe(delay(1))
                    .subscribe(() => expect(test.inProgress$.value).toBe(true));
            }
        }
        const test = new Test();
        expect(test.inProgress$.value).toBe(false);
        test.fn().add(() => {
            expect(test.inProgress$.value).toBe(false);
            done();
        });
    });
    it('should work when double call', (done) => {
        class Test {
            inProgress$ = new BehaviorSubject(false);
            @inProgressTo('inProgress$')
            fn() {
                return of('Test')
                    .pipe(delay(5))
                    .subscribe(() => expect(test.inProgress$.value).toBe(true));
            }
        }
        const test = new Test();
        expect(test.inProgress$.value).toBe(false);
        test.fn().add(() => expect(test.inProgress$.value).toBe(true));
        test.fn().add(() => {
            expect(test.inProgress$.value).toBe(false);
            done();
        });
    });
    it('should work with error', (done) => {
        class Test {
            inProgress$ = new BehaviorSubject(false);
            @inProgressTo('inProgress$')
            fn() {
                return of('Test')
                    .pipe(
                        delay(1),
                        switchMap(() => throwError('Test'))
                    )
                    .subscribe(
                        () => null,
                        () => expect(test.inProgress$.value).toBe(true)
                    );
            }
        }
        const test = new Test();
        expect(test.inProgress$.value).toBe(false);
        test.fn().add(() => {
            expect(test.inProgress$.value).toBe(false);
            done();
        });
    });
});
