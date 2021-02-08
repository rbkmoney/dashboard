import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import moment from 'moment';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { AdditionalFiltersService } from './additional-filters';
import { CardBinPanFilterModule } from './card-bin-pan-filter';
import { PaymentsFiltersComponent } from './payments-filters.component';
import { PaymentsFiltersService } from './services/payments-filters/payments-filters.service';
import { ShopsSelectionManagerService } from './services/shops-selection-manager/shops-selection-manager.service';

@Component({
    selector: 'dsh-daterange-filter',
    template: '',
})
class MockDaterangeFilterComponent {
    @Input() selected;
}

@Component({
    selector: 'dsh-invoices-filter',
    template: '',
})
class MockInvoicesFilterComponent {
    @Input() selected;
}

@Component({
    selector: 'dsh-filter-shops',
    template: '',
})
class MockFilterShopsComponent {
    @Input() selected;
    @Input() shops;
}

@Component({
    selector: 'dsh-filter-button',
    template: '',
})
class MockFilterButtonComponent {
    @Input() active;
}

describe('PaymentsFiltersComponent', () => {
    let component: PaymentsFiltersComponent;
    let fixture: ComponentFixture<PaymentsFiltersComponent>;
    let mockShopsSelectionManagerService: ShopsSelectionManagerService;
    let mockPaymentsFiltersService: PaymentsFiltersService;
    let mockAdditionalFiltersService: AdditionalFiltersService;

    beforeEach(() => {
        mockShopsSelectionManagerService = mock(ShopsSelectionManagerService);
        mockPaymentsFiltersService = mock(PaymentsFiltersService);
        mockAdditionalFiltersService = mock(AdditionalFiltersService);
    });

    beforeEach(() => {
        when(mockPaymentsFiltersService.filtersData$).thenReturn(
            of({
                daterange: {
                    begin: moment(),
                    end: moment(),
                },
            })
        );
    });

    async function createComponent() {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, getTranslocoModule(), FlexLayoutModule, CardBinPanFilterModule],
            declarations: [
                MockDaterangeFilterComponent,
                MockInvoicesFilterComponent,
                MockFilterShopsComponent,
                MockFilterButtonComponent,
                PaymentsFiltersComponent,
            ],
            providers: [
                {
                    provide: ShopsSelectionManagerService,
                    useFactory: () => instance(mockShopsSelectionManagerService),
                },
                {
                    provide: PaymentsFiltersService,
                    useFactory: () => instance(mockPaymentsFiltersService),
                },
                {
                    provide: AdditionalFiltersService,
                    useFactory: () => instance(mockAdditionalFiltersService),
                },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(PaymentsFiltersComponent);
        component = fixture.componentInstance;
    }

    describe('creation', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        it('should emit filters changed event on filters data change', async () => {
            const filtersData = {
                daterange: {
                    begin: moment(),
                    end: moment(),
                },
            };

            when(mockPaymentsFiltersService.filtersData$).thenReturn(of(filtersData));

            await createComponent();

            const spyOnFiltersChanged = spyOn(component.filtersChanged, 'emit').and.callThrough();

            fixture.detectChanges();

            expect(spyOnFiltersChanged).toHaveBeenCalledTimes(1);
            expect(spyOnFiltersChanged).toHaveBeenCalledWith(filtersData);
        });

        it('should update selected ids on filters data change', async () => {
            const filtersData = {
                daterange: {
                    begin: moment(),
                    end: moment(),
                },
                shopIDs: ['id_one', 'id_two'],
            };

            when(mockPaymentsFiltersService.filtersData$).thenReturn(of(filtersData));

            await createComponent();
            fixture.detectChanges();

            verify(mockShopsSelectionManagerService.setSelectedIds(deepEqual(['id_one', 'id_two']))).once();
            expect().nothing();
        });

        it('should update isAdditionalFilterApplied using filters data changes', async () => {
            const filtersData = {
                daterange: {
                    begin: moment(),
                    end: moment(),
                },
                additional: {
                    payerEmail: 'ada@ada',
                },
            };

            when(mockPaymentsFiltersService.filtersData$).thenReturn(of(filtersData));

            await createComponent();
            fixture.detectChanges();

            expect(component.isAdditionalFilterApplied).toBe(true);
        });
    });

    describe('ngOnChanges', () => {
        it('should update tick realm changes', async () => {
            await createComponent();
            fixture.detectChanges();

            component.ngOnChanges({
                realm: {
                    previousValue: null,
                    currentValue: PaymentInstitutionRealm.test,
                    isFirstChange(): boolean {
                        return true;
                    },
                    firstChange: true,
                },
            });

            verify(mockShopsSelectionManagerService.setRealm(PaymentInstitutionRealm.test)).once();

            component.ngOnChanges({
                realm: {
                    previousValue: PaymentInstitutionRealm.test,
                    currentValue: PaymentInstitutionRealm.live,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
            });

            verify(mockShopsSelectionManagerService.setRealm(PaymentInstitutionRealm.live)).once();
            expect().nothing();
        });
    });

    describe('openFiltersDialog', () => {
        beforeEach(() => {
            when(mockPaymentsFiltersService.filtersData$).thenReturn(
                of({
                    daterange: {
                        begin: moment(),
                        end: moment(),
                    },
                    additional: {
                        payerEmail: 'ada@ada',
                    },
                })
            );
        });

        it('should open dialog', async () => {
            await createComponent();
            fixture.detectChanges();

            when(
                mockAdditionalFiltersService.openFiltersDialog(
                    deepEqual({
                        payerEmail: 'ada@ada',
                    })
                )
            ).thenReturn(of());

            component.openFiltersDialog();

            verify(
                mockAdditionalFiltersService.openFiltersDialog(
                    deepEqual({
                        payerEmail: 'ada@ada',
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should not change isAdditionalFilterApplied using response from dialog', async () => {
            when(mockPaymentsFiltersService.filtersData$).thenReturn(
                of({
                    daterange: {
                        begin: moment(),
                        end: moment(),
                    },
                })
            );

            await createComponent();
            fixture.detectChanges();

            when(mockAdditionalFiltersService.openFiltersDialog(deepEqual({}))).thenReturn(
                of({
                    rrn: '1234',
                })
            );

            component.openFiltersDialog();

            expect(component.isAdditionalFilterApplied).toBe(false);
        });
    });

    describe('dateRangeChange', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();
        });

        it('should tick filters changes', () => {
            const daterange = {
                begin: moment(),
                end: moment(),
            };
            component.dateRangeChange(daterange);

            verify(
                mockPaymentsFiltersService.changeFilters(
                    deepEqual({
                        daterange,
                    })
                )
            ).once();
            expect().nothing();
        });
    });

    describe('invoiceSelectionChange', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();
        });

        it('should tick filters change', () => {
            component.invoiceSelectionChange(['invoice_id', 'another_invoice_id']);

            verify(
                mockPaymentsFiltersService.changeFilters(
                    deepEqual({
                        invoiceIDs: ['invoice_id', 'another_invoice_id'],
                    })
                )
            ).once();
            expect().nothing();
        });
    });

    describe('shopSelectionChange', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();
        });

        it('should tick filters change', () => {
            const testList = new Array(4)
                .fill({
                    id: '',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: 'type',
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                })
                .map((el: Shop, i: number) => {
                    return {
                        ...el,
                        id: `test_id_${i}`,
                    };
                });

            component.shopSelectionChange(testList);

            verify(
                mockPaymentsFiltersService.changeFilters(
                    deepEqual({
                        shopIDs: ['test_id_0', 'test_id_1', 'test_id_2', 'test_id_3'],
                    })
                )
            ).once();
            expect().nothing();
        });
    });

    describe('binPanChanged', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();
        });

        it('should tick filters change', () => {
            component.binPanChanged({
                bin: '123456',
                pan: null,
            });

            verify(
                mockPaymentsFiltersService.changeFilters(
                    deepEqual({
                        binPan: {
                            paymentMethod: 'bankCard',
                            bin: '123456',
                            pan: null,
                        },
                    })
                )
            ).once();
            expect().nothing();
        });
    });
});
