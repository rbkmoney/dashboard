import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { NotificationService } from '@dsh/app/shared/services';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';

import { PaymentsPanelsModule } from './payments-panels';
import { PaymentsComponent } from './payments.component';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';
import { PaymentsExpandedIdManager } from './services/payments-expanded-id-manager/payments-expanded-id-manager.service';
import { generateMockPayment } from './tests/generate-mock-payment';

@Component({
    selector: 'dsh-payments-filters',
    template: '',
})
class PaymentsFiltersComponent {
    @Input() realm;
}

describe('PaymentsComponent', () => {
    let component: PaymentsComponent;
    let fixture: ComponentFixture<PaymentsComponent>;
    let mockFetchPaymentsService: FetchPaymentsService;
    let mockNotificationService: NotificationService;
    let mockActivatedRoute: ActivatedRoute;
    let mockPaymentsExpandedIdManager: PaymentsExpandedIdManager;

    beforeEach(() => {
        mockFetchPaymentsService = mock(FetchPaymentsService);
        mockNotificationService = mock(NotificationService);
        mockActivatedRoute = mock(ActivatedRoute);
        mockPaymentsExpandedIdManager = mock(PaymentsExpandedIdManager);
    });

    beforeEach(() => {
        const date = new Date();
        when(mockFetchPaymentsService.paymentsList$).thenReturn(
            of([
                generateMockPayment({
                    statusChangedAt: date.toDateString(),
                    shopName: 'my_name_0',
                    paymentID: 'payment_id_0',
                }),
                generateMockPayment({
                    statusChangedAt: date.toDateString(),
                    shopName: 'my_name_1',
                    paymentID: 'payment_id_1',
                }),
            ])
        );
        when(mockFetchPaymentsService.isLoading$).thenReturn(of(false));
        when(mockFetchPaymentsService.hasMore$).thenReturn(of(false));
        when(mockFetchPaymentsService.lastUpdated$).thenReturn(of());
        when(mockFetchPaymentsService.errors$).thenReturn(of());
    });

    async function configureTestingModule() {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                NoopAnimationsModule,
                LastUpdatedModule,
                PaymentsPanelsModule,
                FlexLayoutModule,
                HttpClientTestingModule,
            ],
            declarations: [PaymentsComponent, PaymentsFiltersComponent],
            providers: [
                {
                    provide: FetchPaymentsService,
                    useFactory: () => instance(mockFetchPaymentsService),
                },
                {
                    provide: NotificationService,
                    useFactory: () => instance(mockNotificationService),
                },
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(mockActivatedRoute),
                },
                {
                    provide: PaymentsExpandedIdManager,
                    useFactory: () => instance(mockPaymentsExpandedIdManager),
                },
            ],
        })
            .overrideComponent(PaymentsComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();
    }

    async function createComponent() {
        await configureTestingModule();

        fixture = TestBed.createComponent(PaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        when(mockActivatedRoute.params).thenReturn(of({ realm: PaymentInstitutionRealm.live }));
        when(mockPaymentsExpandedIdManager.expandedId$).thenReturn(of(1));
    });

    describe('creation', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        it('should init fetching using realm from route', async () => {
            when(mockActivatedRoute.params).thenReturn(
                of({
                    realm: PaymentInstitutionRealm.test,
                })
            );

            await createComponent();

            verify(mockFetchPaymentsService.initRealm(PaymentInstitutionRealm.test)).once();
            expect().nothing();
        });

        it('should take one realm to init fetcher', async () => {
            when(mockActivatedRoute.params).thenReturn(
                of(
                    {
                        realm: PaymentInstitutionRealm.test,
                    },
                    {
                        realm: PaymentInstitutionRealm.live,
                    }
                )
            );

            await createComponent();

            verify(mockFetchPaymentsService.initRealm(PaymentInstitutionRealm.test)).once();
            verify(mockFetchPaymentsService.initRealm(PaymentInstitutionRealm.live)).never();
            expect().nothing();
        });

        it('should notify about errors in fetcher', async () => {
            when(mockFetchPaymentsService.errors$).thenReturn(of(new Error('mine')));

            await createComponent();

            verify(mockNotificationService.error()).once();
            expect().nothing();
        });
    });

    describe('refreshList', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should call refresh data', () => {
            when(mockFetchPaymentsService.refresh()).thenReturn();

            component.refreshList();

            verify(mockFetchPaymentsService.refresh()).once();
            expect().nothing();
        });
    });

    describe('requestNextPage', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should call fetch more data', () => {
            when(mockFetchPaymentsService.fetchMore()).thenReturn();

            component.requestNextPage();

            verify(mockFetchPaymentsService.fetchMore()).once();
            expect().nothing();
        });
    });

    describe('filtersChanged', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should request list using filters data', () => {
            const filtersData = {
                daterange: {
                    begin: moment(),
                    end: moment(),
                },
                invoiceIDs: ['invoice_id_1', 'invoice_id_2'],
                shopIDs: [],
            };

            component.filtersChanged(filtersData);

            verify(
                mockFetchPaymentsService.search(
                    deepEqual({
                        date: filtersData.daterange,
                        invoiceIDs: filtersData.invoiceIDs,
                        shopIDs: filtersData.shopIDs,
                    })
                )
            );
            expect().nothing();
        });
    });

    describe('expandedIdChange', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should call expanded id manager change method with provided id', () => {
            component.expandedIdChange(4);

            verify(mockPaymentsExpandedIdManager.expandedIdChange(4)).once();
            expect().nothing();
        });
    });
});
