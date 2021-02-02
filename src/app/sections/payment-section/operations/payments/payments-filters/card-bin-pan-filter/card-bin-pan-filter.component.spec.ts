import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { instance, mock, verify } from 'ts-mockito';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { FilterComponent, FilterModule } from '@dsh/components/filters/filter';
import { FormatInputModule } from '@dsh/components/form-controls';
import { ComponentChange } from '@dsh/type-utils';

import { CardBinPanFilterComponent } from './card-bin-pan-filter.component';
import { CardBinPan } from './types/card-bin-pan';

describe('CardBinPanFilterComponent', () => {
    let component: CardBinPanFilterComponent;
    let fixture: ComponentFixture<CardBinPanFilterComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    getTranslocoModule(),
                    NoopAnimationsModule,
                    FilterModule,
                    MatFormFieldModule,
                    FormatInputModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                ],
                declarations: [CardBinPanFilterComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CardBinPanFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnChanges', () => {
        function tickBinPanChanges(
            binPan: CardBinPan,
            change: Partial<ComponentChange<CardBinPanFilterComponent, 'binPan'>> = {}
        ): void {
            component.binPan = binPan;
            component.ngOnChanges({
                binPan: {
                    previousValue: undefined,
                    currentValue: component.binPan,
                    firstChange: false,
                    isFirstChange(): boolean {
                        return false;
                    },
                    ...change,
                },
            });
        }

        beforeEach(() => {
            tickBinPanChanges(
                { bin: null, pan: null },
                {
                    firstChange: true,
                    isFirstChange(): boolean {
                        return true;
                    },
                }
            );
        });

        it('should update on any change', () => {
            expect(component.titleValues).toBe('');
            expect(component.form.value).toEqual({ bin: null, pan: null });
            expect(component.isActive).toBe(false);

            tickBinPanChanges({ bin: '123456', pan: '1234' });

            expect(component.titleValues).toBe('1234 56** **** 1234');
            expect(component.form.value).toEqual({ bin: '123456', pan: '1234' });
            expect(component.isActive).toBe(true);
        });

        describe('update title', () => {
            it('should format title using values', () => {
                tickBinPanChanges({ bin: '111122', pan: '4444' });

                expect(component.titleValues).toBe('1111 22** **** 4444');
            });

            it('should format only bin', () => {
                tickBinPanChanges({ bin: '123456', pan: null });

                expect(component.titleValues).toBe('1234 56** **** ****');
            });

            it('should format only pan', () => {
                tickBinPanChanges({ bin: null, pan: '1234' });

                expect(component.titleValues).toBe('**** **** **** 1234');
            });
        });

        describe('update isActive status', () => {
            it('should set isActive to true if any of values in binPan exist', () => {
                tickBinPanChanges({ bin: null, pan: '4444' });

                expect(component.isActive).toBe(true);

                tickBinPanChanges({ bin: '111122', pan: null });

                expect(component.isActive).toBe(true);

                tickBinPanChanges({ bin: '111122', pan: '4444' });

                expect(component.isActive).toBe(true);
            });

            it('should set isActive to true if none of values in binPan exist', () => {
                tickBinPanChanges({ bin: null, pan: null });

                expect(component.isActive).toBe(false);
            });
        });

        describe('update form', () => {
            it('should form using provided nullable binPan values', () => {
                tickBinPanChanges({ bin: null, pan: null });

                expect(component.form.value).toEqual({ bin: null, pan: null });
            });

            it('should form using provided only bin binPan values', () => {
                tickBinPanChanges({ bin: '123456', pan: null });

                expect(component.form.value).toEqual({ bin: '123456', pan: null });
            });

            it('should form using provided only pan binPan values', () => {
                tickBinPanChanges({ bin: null, pan: '1234' });

                expect(component.form.value).toEqual({ bin: null, pan: '1234' });
            });

            it('should form using provided fully binPan values', () => {
                tickBinPanChanges({ bin: '123456', pan: '1234' });

                expect(component.form.value).toEqual({ bin: '123456', pan: '1234' });
            });

            it('should form using provided undefined binPan value', () => {
                tickBinPanChanges(undefined);

                expect(component.form.value).toEqual({ bin: null, pan: null });
            });
        });
    });

    describe('onOpened', () => {
        it('should update form value', () => {
            expect(component.form.value).toEqual({ bin: null, pan: null });

            component.binPan = { bin: '123456', pan: '1234' };
            component.popupOpened();

            expect(component.form.value).toEqual({ bin: '123456', pan: '1234' });
        });
    });

    describe('onClosed', () => {
        it('should emit filter changed using form values', () => {
            const spyOnFilterChanged = spyOn(component.filterChanged, 'emit').and.callThrough();

            component.form.setValue({ bin: '123456', pan: null });
            component.popupClosed();

            expect(spyOnFilterChanged).toHaveBeenCalledTimes(1);
            expect(spyOnFilterChanged).toHaveBeenCalledWith({ bin: '123456', pan: null });
        });

        it('should update title and active status using form values', () => {
            component.form.setValue({ bin: null, pan: '1234' });
            component.popupClosed();

            expect(component.titleValues).toBe('**** **** **** 1234');
            expect(component.isActive).toBe(true);
        });
    });

    describe('onSave', () => {
        it('should close filter component', () => {
            const mockFilterComponent = mock(FilterComponent);
            component.filter = instance(mockFilterComponent);

            component.save();

            verify(mockFilterComponent.close()).once();
            expect().nothing();
        });
    });

    describe('onClear', () => {
        it('should reset form data', () => {
            component.form.setValue({ bin: '123456', pan: '1234' });

            component.clear();

            expect(component.form.value).toEqual({ bin: null, pan: null });
        });
    });
});
