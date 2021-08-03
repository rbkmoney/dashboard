import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomerPayer, Payer, PaymentResourcePayer } from '@dsh/api-codegen/anapi';
import { ToMajorModule } from '@dsh/app/shared/pipes';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { StatusModule } from '@dsh/components/indicators';

import { generateMockPayment } from '../../../tests/generate-mock-payment';
import { MockDetailsItemModule } from '../../../tests/mock-details-item-component';
import { MockShopDetailsPipe } from '../../../tests/mock-shop-details-pipe';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { ChargeAmountComponent } from './components/charge-amount/charge-amount.component';
import { PaymentFeeComponent } from './components/payment-fee/payment-fee.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { ResourcePayerComponent } from './components/resource-payer/resource-payer.component';
import { ShopNameComponent } from './components/shop-name/shop-name.component';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentToolModule } from './payment-tool';
import { PaymentErrorMessagePipe } from './pipes/payment-error-message/payment-error-message.pipe';

describe('PaymentMainInfoComponent', () => {
    let component: PaymentMainInfoComponent;
    let fixture: ComponentFixture<PaymentMainInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                MockDetailsItemModule,
                PaymentToolModule,
                FlexLayoutModule,
                ToMajorModule,
                StatusModule,
            ],
            declarations: [
                PaymentMainInfoComponent,
                PaymentStatusComponent,
                PaymentErrorMessagePipe,
                ChargeAmountComponent,
                PaymentFeeComponent,
                ResourcePayerComponent,
                ShopNameComponent,
                AdditionalInfoComponent,
                MockShopDetailsPipe,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentMainInfoComponent);
        component = fixture.componentInstance;
        component.payment = generateMockPayment({
            amount: 1000,
            fee: 200,
            currency: 'USD',
            payer: {
                payerType: Payer.PayerTypeEnum.CustomerPayer,
                paymentToolDetails: {
                    detailsType: 'mine-1',
                },
            } as CustomerPayer,
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('resourcePayer', () => {
        it('should return null if payer type is not a resource payer', () => {
            component.payment = generateMockPayment({
                payer: {
                    payerType: Payer.PayerTypeEnum.CustomerPayer,
                    paymentToolDetails: {
                        detailsType: 'mine',
                    },
                } as CustomerPayer,
            });
            expect(component.resourcePayer).toBeNull();
        });

        it('should return payer value if payer type is resource payer', () => {
            component.payment = generateMockPayment({
                payer: {
                    payerType: Payer.PayerTypeEnum.PaymentResourcePayer,
                    paymentToolDetails: {
                        detailsType: 'mine',
                    },
                    paymentToolToken: 'my_token',
                    paymentSession: 'session_token',
                    contactInfo: {},
                } as PaymentResourcePayer,
            });
            expect(component.resourcePayer).toEqual({
                payerType: Payer.PayerTypeEnum.PaymentResourcePayer,
                paymentToolDetails: {
                    detailsType: 'mine',
                },
                paymentToolToken: 'my_token',
                paymentSession: 'session_token',
                contactInfo: {},
            });
        });
    });
});
