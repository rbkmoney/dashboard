import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { generateMockPaymentsList } from '../../tests/generate-mock-payments-list';
import { PaymentsService } from '../payments/payments.service';
import { PaymentsExpandedIdManager } from './payments-expanded-id-manager.service';

describe('PaymentsExpandedIdManager', () => {
    let service: PaymentsExpandedIdManager;
    let mockPaymentsService: PaymentsService;
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(() => {
        mockPaymentsService = mock(PaymentsService);
        mockActivatedRoute = mock(ActivatedRoute);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                PaymentsExpandedIdManager,
                {
                    provide: PaymentsService,
                    useFactory: () => instance(mockPaymentsService),
                },
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(mockActivatedRoute),
                },
            ],
        });
    });

    it('should be created', () => {
        when(mockActivatedRoute.fragment).thenReturn(of('test'));
        service = TestBed.inject(PaymentsExpandedIdManager);
        expect(service).toBeTruthy();
    });

    describe('expandedId$', () => {
        it('should return index position in payments list using fragment id', () => {
            when(mockPaymentsService.data$).thenReturn(of(generateMockPaymentsList(3)));
            when(mockActivatedRoute.fragment).thenReturn(of('invoiceIDmock_payment_1'));
            service = TestBed.inject(PaymentsExpandedIdManager);

            expect(service.expandedId$).toBeObservable(
                cold('(a|)', {
                    a: 1,
                })
            );
        });

        it('should return -1 if items was not found in list', () => {
            when(mockPaymentsService.data$).thenReturn(of(generateMockPaymentsList(3)));
            when(mockActivatedRoute.fragment).thenReturn(of(''));
            service = TestBed.inject(PaymentsExpandedIdManager);

            expect(service.expandedId$).toBeObservable(
                cold('(a|)', {
                    a: -1,
                })
            );
        });

        it('should return -1 if list is empty', () => {
            when(mockPaymentsService.data$).thenReturn(of([]));
            when(mockActivatedRoute.fragment).thenReturn(of('test'));
            service = TestBed.inject(PaymentsExpandedIdManager);

            expect(service.expandedId$).toBeObservable(
                cold('(a|)', {
                    a: -1,
                })
            );
        });
    });
});
