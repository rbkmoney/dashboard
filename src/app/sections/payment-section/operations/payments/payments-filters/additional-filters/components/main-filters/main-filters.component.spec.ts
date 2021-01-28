import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { MainFiltersComponent } from './main-filters.component';

describe('MainFiltersComponent', () => {
    let component: MainFiltersComponent;
    let fixture: ComponentFixture<MainFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                FlexLayoutModule,
            ],
            declarations: [MainFiltersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', async () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        let spyOnFiltersChanged: jasmine.Spy;

        beforeEach(() => {
            spyOnFiltersChanged = spyOn(component.filtersChanged, 'emit').and.callThrough();
        });

        it('should emit filtersChanged using form value', () => {
            component.form.setValue({
                payerEmail: 'ada@ada',
                customerID: '',
                rrn: '12345678',
            });

            expect(spyOnFiltersChanged).toHaveBeenCalledTimes(1);
            expect(spyOnFiltersChanged).toHaveBeenCalledWith({
                payerEmail: 'ada@ada',
                customerID: '',
                rrn: '12345678',
            });
        });

        it('should remove invalid fields from form value before emit', () => {
            component.form.setValue({
                payerEmail: 'ada',
                customerID: '1456',
                rrn: 'aa13',
            });

            expect(spyOnFiltersChanged).toHaveBeenCalledTimes(1);
            expect(spyOnFiltersChanged).toHaveBeenCalledWith({
                customerID: '1456',
            });
        });
    });

    describe('ngOnChanges', () => {
        it('should update form value', () => {
            component.ngOnChanges({
                data: {
                    previousValue: undefined,
                    currentValue: {
                        payerEmail: 'ada@ada',
                        customerID: '',
                        rrn: '12345678',
                    },
                    firstChange: true,
                    isFirstChange(): boolean {
                        return true;
                    },
                },
            });

            expect(component.form.value).toEqual({
                payerEmail: 'ada@ada',
                customerID: '',
                rrn: '12345678',
            });
        });

        it('should update form value on any change', () => {
            component.ngOnChanges({
                data: {
                    previousValue: {
                        payerEmail: '',
                        customerID: '1414',
                        rrn: '09876',
                    },
                    currentValue: {
                        payerEmail: 'ada@ada',
                        customerID: '',
                        rrn: '12345678',
                    },
                    firstChange: false,
                    isFirstChange(): boolean {
                        return false;
                    },
                },
            });

            expect(component.form.value).toEqual({
                payerEmail: 'ada@ada',
                customerID: '',
                rrn: '12345678',
            });
        });

        it('should update form value only if something changed', () => {
            component.form.setValue({
                payerEmail: '',
                customerID: '1414',
                rrn: '09876',
            });

            expect(component.form.value).toEqual({
                payerEmail: '',
                customerID: '1414',
                rrn: '09876',
            });

            component.ngOnChanges({
                data: {
                    previousValue: {
                        payerEmail: '',
                        customerID: '1414',
                        rrn: '09876',
                    },
                    currentValue: {
                        payerEmail: '',
                        customerID: '1414',
                        rrn: '09876',
                    },
                    firstChange: false,
                    isFirstChange(): boolean {
                        return false;
                    },
                },
            });

            expect(component.form.value).toEqual({
                payerEmail: '',
                customerID: '1414',
                rrn: '09876',
            });
        });
    });
});
