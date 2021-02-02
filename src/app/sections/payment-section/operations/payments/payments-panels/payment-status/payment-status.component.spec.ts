import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';
import { StatusModule } from '@dsh/components/indicators';

import { PaymentStatusComponent } from './payment-status.component';
import { PaymentStatusColorPipe } from './pipes/status-color/status-color.pipe';

describe('PaymentStatusComponent', () => {
    let component: PaymentStatusComponent;
    let fixture: ComponentFixture<PaymentStatusComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    StatusModule,
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
                declarations: [PaymentStatusComponent, PaymentStatusColorPipe],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render valid status name', () => {
            component.status = PaymentSearchResult.StatusEnum.Refunded;

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('dsh-status')).nativeElement.textContent.trim()).toBe('Возвращен');

            component.status = PaymentSearchResult.StatusEnum.Processed;

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('dsh-status')).nativeElement.textContent.trim()).toBe('Обработан');
        });
    });
});
