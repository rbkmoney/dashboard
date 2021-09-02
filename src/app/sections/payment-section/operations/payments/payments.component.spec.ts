import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { QueryParamsService } from '@dsh/app/shared/services/query-params';
import { provideMockService } from '@dsh/app/shared/tests';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';

import { PaymentInstitutionRealmService, RealmMixService } from '../../services';
import { PaymentsComponent } from './payments.component';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';
import { PaymentsExpandedIdManager } from './services/payments-expanded-id-manager/payments-expanded-id-manager.service';
import { generateMockPayment } from './tests/generate-mock-payment';

@Component({
    selector: 'dsh-payments-filters',
    template: '',
})
class MockPaymentsFiltersComponent {
    @Input() realm;
}

@Component({
    selector: 'dsh-payments-panels',
    template: '',
})
class MockPaymentsPanelsComponent {
    @Input() list: PaymentSearchResult[];
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() showMore = new EventEmitter<void>();
    @Output() expandedIdChanged = new EventEmitter<number>();
}

describe('PaymentsComponent', () => {
    let component: PaymentsComponent;
    let fixture: ComponentFixture<PaymentsComponent>;
    let mockActivatedRoute: ActivatedRoute;
    let mockPaymentsExpandedIdManager: PaymentsExpandedIdManager;
    let mockPaymentsService: FetchPaymentsService;
    let mockPaymentInstitutionRealmService: PaymentInstitutionRealmService;
    let mockRealmMixinService: RealmMixService<any>;
    let mockQueryParamsService: QueryParamsService<any>;

    beforeEach(() => {
        mockActivatedRoute = mock(ActivatedRoute);
        mockPaymentsExpandedIdManager = mock(PaymentsExpandedIdManager);
        mockPaymentsService = mock(FetchPaymentsService);
        mockPaymentInstitutionRealmService = mock(PaymentInstitutionRealmService);
        mockRealmMixinService = mock(RealmMixService);
        mockQueryParamsService = mock(QueryParamsService);
    });

    beforeEach(() => {
        const date = new Date();
        when(mockPaymentsService.paymentsList$).thenReturn(
            of([
                generateMockPayment({
                    statusChangedAt: date,
                    id: 'payment_id_0',
                }),
                generateMockPayment({
                    statusChangedAt: date,
                    id: 'payment_id_1',
                }),
            ])
        );
        when(mockPaymentsService.isLoading$).thenReturn(of(false));
        when(mockPaymentsService.hasMore$).thenReturn(of(false));
        when(mockPaymentsService.lastUpdated$).thenReturn(of());
        when(mockPaymentInstitutionRealmService.realm$).thenReturn(of());
        when(mockRealmMixinService.mixedValue$).thenReturn(of());
    });

    async function configureTestingModule() {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                NoopAnimationsModule,
                LastUpdatedModule,
                FlexLayoutModule,
                HttpClientTestingModule,
            ],
            declarations: [PaymentsComponent, MockPaymentsFiltersComponent, MockPaymentsPanelsComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(mockActivatedRoute),
                },
                {
                    provide: PaymentsExpandedIdManager,
                    useFactory: () => instance(mockPaymentsExpandedIdManager),
                },
                {
                    provide: FetchPaymentsService,
                    useFactory: () => instance(mockPaymentsService),
                },
                {
                    provide: PaymentInstitutionRealmService,
                    useFactory: () => instance(mockPaymentInstitutionRealmService),
                },
                {
                    provide: RealmMixService,
                    useFactory: () => instance(mockRealmMixinService),
                },
                provideMockService(QueryParamsService, mockQueryParamsService),
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
        when(mockActivatedRoute.params).thenReturn(of({ realm: PaymentInstitutionRealm.Live }));
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

    describe('refreshList', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should call refresh data', () => {
            when(mockPaymentsService.refresh()).thenReturn();

            component.refreshList();

            verify(mockPaymentsService.refresh()).once();
            expect().nothing();
        });
    });

    describe('requestNextPage', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should call fetch more data', () => {
            when(mockPaymentsService.fetchMore()).thenReturn();

            component.requestNextPage();

            verify(mockPaymentsService.fetchMore()).once();
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
