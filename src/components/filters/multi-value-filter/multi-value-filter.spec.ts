import { Component, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaySubject } from 'rxjs';

import { MultiValueFilterComponent } from './multi-value-filter.component';
import { MultiValueFilterModule } from './multi-value-filter.module';

describe('MultiValueFilter', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [MultiValueFilterModule, NoopAnimationsModule],
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
                template: `<dsh-multi-value-filter label="test"></dsh-multi-value-filter>`,
            })
            class SampleComponent {}
            const fixture = createComponent(SampleComponent);
            expect(
                fixture.debugElement.query(By.directive(MultiValueFilterComponent)).nativeElement.textContent.trim()
            ).toBe('test');
        });

        it('Should have the selectedLabel', () => {
            @Component({
                template: `<dsh-multi-value-filter
                    label="test"
                    selectedLabel="selected"
                    [value]="[1]"
                ></dsh-multi-value-filter>`,
            })
            class SampleComponent {}
            const fixture = createComponent(SampleComponent);
            expect(
                fixture.debugElement.query(By.directive(MultiValueFilterComponent)).nativeElement.textContent.trim()
            ).toBe('selected · 1');
        });
    });

    describe('Should return value', () => {
        it('Should return init value', (done) => {
            @Component({
                template: `<dsh-multi-value-filter
                    [value]="[1]"
                    (valueChanges)="value$.next($event)"
                ></dsh-multi-value-filter>`,
            })
            class SampleComponent {
                value$ = new ReplaySubject();
            }
            const fixture = createComponent(SampleComponent);
            fixture.debugElement.context.value$.subscribe((v) => {
                expect(v).toEqual([1]);
                done();
            });
        });
    });
});
