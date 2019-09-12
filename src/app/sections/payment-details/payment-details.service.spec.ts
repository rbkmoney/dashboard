import { ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { Observable, of } from 'rxjs';

import { PaymentDetailsService } from './payment-details.service';
import { PayerType } from './payer-details';
import {
    PaymentFlowInstant,
    PaymentSearchResult,
    PaymentStatus,
    SearchService
} from '../../api-codegen/capi/swagger-codegen';
import { PaymentSearchService } from '../../api/search';

const dummyPayer = {
    payerType: PayerType.CustomerPayer,
    customerID: 'test'
};

const dummyFlow: PaymentFlowInstant = {
    type: 'PaymentFlowInstant'
};

const dummyPaymentID = '100';
const dummyInvoiceID = 'test';

const dummyPayment: PaymentSearchResult = {
    id: dummyPaymentID,
    status: PaymentStatus.StatusEnum.Pending,
    invoiceID: dummyInvoiceID,
    createdAt: moment().format() as any,
    amount: 1000,
    currency: 'RUB',
    payer: dummyPayer,
    flow: dummyFlow
};

const fakePaymentSearchService = new PaymentSearchService({} as SearchService);

const fakeActivatedRoute = {
    params: {
        pipe: (): Observable<Params> => of(dummyPayment)
    }
} as ActivatedRoute;

describe('Payment details service', () => {
    let service: PaymentDetailsService;

    beforeEach(() => {
        service = new PaymentDetailsService(fakePaymentSearchService, fakeActivatedRoute);
    });

    it('should get payment', () => {
        service.getPayment().subscribe(res => {
            expect(res).toEqual(dummyPayment);
        });
    });
});
