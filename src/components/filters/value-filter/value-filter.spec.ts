import { Component, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { ReplaySubject } from 'rxjs';

import { ValueFilterComponent } from './value-filter.component';
import { ValueFilterModule } from './value-filter.module';

describe('ValueFilter', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [
                ValueFilterModule,
                NoopAnimationsModule,
                TranslocoTestingModule.withLangs({
                    en: {
                        save: 'Save',
                        clear: 'Clear',
                    },
                }),
            ],
            declarations: [component, ...declarations],
            providers,
        }).compileComponents();
        const fixture = TestBed.createComponent<T>(component);
        fixture.detectChanges();
        return fixture;
    }

    describe('Should have a labels', () => {
        it('Should have the label', () => {
            @Component({
                template: `<dsh-value-filter label="test"></dsh-value-filter>`,
            })
            class SampleComponent {}
            const fixture = createComponent(SampleComponent);
            expect(
                fixture.debugElement.query(By.directive(ValueFilterComponent)).nativeElement.textContent.trim()
            ).toBe('test');
        });

        it('Should have the selectedLabel', () => {
            @Component({
                template: `<dsh-value-filter label="test" selectedLabel="selected" value="1"></dsh-value-filter>`,
            })
            class SampleComponent {}
            const fixture = createComponent(SampleComponent);
            expect(
                fixture.debugElement.query(By.directive(ValueFilterComponent)).nativeElement.textContent.trim()
            ).toBe('selected');
        });
    });

    describe('Should return value', () => {
        it('Should return init value', (done) => {
            @Component({
                template: `<dsh-value-filter value="1" (valueChanges)="value$.next($event)"></dsh-value-filter>`,
            })
            class SampleComponent {
                value$ = new ReplaySubject();
            }
            const fixture = createComponent(SampleComponent);
            fixture.debugElement.context.value$.subscribe((v) => {
                expect(v).toBe('1');
                done();
            });
        });
    });
});
