// TODO: fix unit tests
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { TranslocoTestingModule } from '@ngneat/transloco';
// import { of } from 'rxjs';
// import { instance, mock, verify, when } from 'ts-mockito';
//
// import { PaymentSearchResult } from '@dsh/api-codegen/capi';
// import { PaymentInstitutionRealm } from '@dsh/api/model';
// import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
//
// import { PaymentsFiltersModule } from './payments-filters';
// import { PaymentsListComponent } from './payments-list.component';
// import { PaymentsPanelsModule } from './payments-panels';
// import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';

// describe('PaymentsListComponent', () => {
//     let component: PaymentsListComponent;
//     let fixture: ComponentFixture<PaymentsListComponent>;
//     let mockFetchPaymentsService: FetchPaymentsService;
//     let mockMatSnackBar: MatSnackBar;
//
//     beforeEach(() => {
//         mockFetchPaymentsService = mock(FetchPaymentsService);
//         mockMatSnackBar = mock(MatSnackBar);
//     });
//
//     beforeEach(() => {
//         const date = new Date();
//         when(mockFetchPaymentsService.paymentsList$).thenReturn(
//             of([
//                 {
//                     amount: 20,
//                     currency: 'USD',
//                     status: PaymentSearchResult.StatusEnum.Pending,
//                     statusChangedAt: date.toDateString(),
//                     invoiceID: 'invoiceID',
//                     shopName: 'my_name_0',
//                     paymentID: 'payment_id_0',
//                 },
//                 {
//                     amount: 20,
//                     currency: 'USD',
//                     status: PaymentSearchResult.StatusEnum.Pending,
//                     statusChangedAt: date.toDateString(),
//                     invoiceID: 'invoiceID',
//                     shopName: 'my_name_1',
//                     paymentID: 'payment_id_1',
//                 },
//             ])
//         );
//         when(mockFetchPaymentsService.isLoading$).thenReturn(of(false));
//         when(mockFetchPaymentsService.hasMore$).thenReturn(of(false));
//         when(mockFetchPaymentsService.lastUpdated$).thenReturn(of());
//         when(mockFetchPaymentsService.errors$).thenReturn(of());
//     });
//
//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [
//                 // TODO: add getTranslocoModule here
//                 TranslocoTestingModule,
//                 NoopAnimationsModule,
//                 PaymentsFiltersModule,
//                 LastUpdatedModule,
//                 PaymentsPanelsModule,
//                 FlexLayoutModule,
//             ],
//             declarations: [PaymentsListComponent],
//             providers: [
//                 {
//                     provide: FetchPaymentsService,
//                     useFactory: () => instance(mockFetchPaymentsService),
//                 },
//                 {
//                     provide: MatSnackBar,
//                     useFactory: () => instance(mockMatSnackBar),
//                 },
//             ],
//         }).compileComponents();
//
//         fixture = TestBed.createComponent(PaymentsListComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//
//     describe('ngOnChanges', () => {
//         it('should init realm', () => {
//             component.realm = PaymentInstitutionRealm.test;
//             when(mockFetchPaymentsService.initRealm(PaymentInstitutionRealm.test)).thenReturn();
//
//             component.ngOnChanges({
//                 realm: {
//                     previousValue: null,
//                     currentValue: PaymentInstitutionRealm.test,
//                     isFirstChange(): boolean {
//                         return false;
//                     },
//                     firstChange: false,
//                 },
//             });
//
//             verify(mockFetchPaymentsService.initRealm(PaymentInstitutionRealm.test)).once();
//             expect().nothing();
//         });
//     });
//
//     describe('refreshList', () => {
//         it('should call refresh data', () => {
//             when(mockFetchPaymentsService.refresh()).thenReturn();
//
//             component.refreshList();
//
//             verify(mockFetchPaymentsService.refresh()).once();
//             expect().nothing();
//         });
//     });
//
//     describe('requestNextPage', () => {
//         it('should call fetch more data', () => {
//             when(mockFetchPaymentsService.fetchMore()).thenReturn();
//
//             component.requestNextPage();
//
//             verify(mockFetchPaymentsService.fetchMore()).once();
//             expect().nothing();
//         });
//     });
// });
