import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import moment from 'moment';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, CardModule, ExpandPanelModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { Payment } from '../../types/payment';
import { PaymentsDetailsModule } from './payments-details/payments-details.module';
import { PaymentsPanelsComponent } from './payments-panels.component';

@Component({
    selector: 'dsh-payments-row-header',
    template: '',
})
class MockRowHeaderComponent {}

@Component({
    selector: 'dsh-payments-row',
    template: '',
})
class MockRowComponent {
    @Input() payment: Payment;
}

describe('PaymentsPanelsComponent', () => {
    let component: PaymentsPanelsComponent;
    let fixture: ComponentFixture<PaymentsPanelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                SpinnerModule,
                EmptySearchResultModule,
                AccordionModule,
                CardModule,
                ShowMorePanelModule,
                ExpandPanelModule,
                PaymentsDetailsModule,
                NoopAnimationsModule,
                TranslocoTestingModule.withLangs(
                    {
                        ru: {
                            emptySearchResult: 'Данные за указанный период отсутствуют',
                        },
                    },
                    {
                        availableLangs: ['ru'],
                        defaultLang: 'ru',
                    }
                ),
            ],
            declarations: [PaymentsPanelsComponent, MockRowHeaderComponent, MockRowComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentsPanelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('isEmptyList', () => {
        it('should be true if list was not provided', () => {
            expect(component.isEmptyList).toBe(true);
        });

        it('should be true if list is empty', () => {
            component.list = [];

            fixture.detectChanges();

            expect(component.isEmptyList).toBe(true);
        });

        it('should be false if list contains at least one element', () => {
            const date = moment();

            component.list = new Array(1).fill({
                amount: 20,
                currency: 'USD',
                status: PaymentSearchResult.StatusEnum.Pending,
                statusChangedAt: date.format(),
                invoiceID: 'id',
                shopName: 'My Shop',
                paymentID: 'id',
            });

            fixture.detectChanges();

            expect(component.isEmptyList).toBe(false);

            component.list = new Array(15).fill({
                amount: 20,
                currency: 'USD',
                status: PaymentSearchResult.StatusEnum.Pending,
                statusChangedAt: date.format(),
                invoiceID: 'id',
                shopName: 'My Shop',
                paymentID: 'id',
            });

            fixture.detectChanges();

            expect(component.isEmptyList).toBe(false);
        });
    });

    //
    // showMoreElements
    // expandedIdChange
});