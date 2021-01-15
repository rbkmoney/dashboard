import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';
import moment from 'moment';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';
import { BalanceModule } from '@dsh/app/shared/components/balance/balance.module';
import { RowModule } from '@dsh/components/layout';

import { generateMockPayment } from '../../../tests/generate-mock-payment';
import { PaymentStatusModule } from '../../payment-status';
import { PaymentsRowComponent } from './payments-row.component';

describe('PaymentsRowComponent', () => {
    let fixture: ComponentFixture<PaymentsRowComponent>;
    let component: PaymentsRowComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RowModule,
                PaymentStatusModule,
                BalanceModule,
                TranslocoTestingModule.withLangs(
                    {
                        ru: {
                            paymentStatus: {
                                pending: 'Запущен',
                                processed: 'Обработан',
                                captured: 'Подтвержден',
                                cancelled: 'Отменен',
                                refunded: 'Возвращен',
                                failed: 'Неуспешен',
                            },
                        },
                    },
                    {
                        availableLangs: ['ru'],
                        defaultLang: 'ru',
                    }
                ),
            ],
            declarations: [PaymentsRowComponent],
        })
            .overrideComponent(PaymentsRowComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentsRowComponent);
        component = fixture.componentInstance;
        component.payment = generateMockPayment();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should show balances component if shop was provided', () => {
            const date = moment();
            component.payment = generateMockPayment({
                amount: 20,
                currency: 'USD',
                status: PaymentSearchResult.StatusEnum.Pending,
                statusChangedAt: date.format(),
                invoiceID: 'id',
                shopName: 'My Shop',
                id: 'id',
            });

            fixture.detectChanges();

            const labels = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-label'));

            expect(labels.length).toBe(4);
            expect(labels[0].nativeElement.textContent.trim()).toBe(`$0.20`);
            expect(labels[1].nativeElement.textContent.trim()).toBe(`Запущен`);
            expect(labels[2].nativeElement.textContent.trim()).toBe(date.format('DD MMMM YYYY, HH:mm'));
            expect(labels[3].nativeElement.textContent.trim()).toBe(`My Shop`);
        });
    });
});
