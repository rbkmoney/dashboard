// import { getTestBed, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ActivatedRoute } from '@angular/router';
// import moment from 'moment';
//
// import { PaymentDetailsService } from './payment-details.service';
// import { CustomerPayer, PaymentFlowInstant, PaymentSearchResult, PaymentStatus, SearchService } from '../../api/capi/swagger-codegen';
// import { PayerType } from './payer-details';
// import { PaymentSearchService } from '../../search';
// import { Observable, of } from 'rxjs';
//
// const dummyPayer: CustomerPayer = {
//     payerType: PayerType.CustomerPayer,
//     customerID: 'test'
// };
//
// const dummyFlow: PaymentFlowInstant = {
//     type: 'PaymentFlowInstant'
// };
//
// const dummyPaymentID = '100';
// const dummyInvoiceID = 'test';
//
// const dummyPayment: PaymentSearchResult = {
//     id: dummyPaymentID,
//     status: PaymentStatus.StatusEnum.Pending,
//     invoiceID: dummyInvoiceID,
//     createdAt: moment().format() as any,
//     amount: 1000,
//     currency: 'RUB',
//     payer: dummyPayer,
//     flow: dummyFlow
// };
//
// const fakePaymentSearchService = new PaymentSearchService({} as SearchService);
//
// const fakeActivatedRoute = {
//     params: {}
// } as ActivatedRoute;
//
// describe('Payment details service', () => {
//     let service: PaymentDetailsService;
//
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [HttpClientTestingModule],
//             providers: [PaymentDetailsService]
//         });
//
//         service = new PaymentDetailsService(fakePaymentSearchService, fakeActivatedRoute);
//     });
//
//     it('should getPayment', () => {
//         service.getPayment().subscribe((res) => {
//             expect(res).toEqual(dummyPayment);
//         });
//     });
//
// });
