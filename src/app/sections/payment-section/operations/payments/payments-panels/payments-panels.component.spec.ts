import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import moment from 'moment';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, CardModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { PaymentsDetailsModule } from './payments-details';
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
    @Input() payment: PaymentSearchResult;
}

describe('PaymentsPanelsComponent', () => {
    let component: PaymentsPanelsComponent;
    let fixture: ComponentFixture<PaymentsPanelsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                SpinnerModule,
                EmptySearchResultModule,
                AccordionModule,
                CardModule,
                ShowMorePanelModule,
                PaymentsDetailsModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
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
    });

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
                paymentID: 'id',
            });

            fixture.detectChanges();

            expect(component.isEmptyList).toBe(false);
        });
    });

    describe('showMoreElements', () => {
        it('should emit output event showMore', () => {
            const spyOnShowMore = spyOn(component.showMore, 'emit');

            component.showMoreElements();

            expect(spyOnShowMore).toHaveBeenCalledTimes(1);
        });
    });

    describe('expandedIdChange', () => {
        it('should emit output that expanded id changed', () => {
            const spyOnExpandedIdChanged = spyOn(component.expandedIdChanged, 'emit').and.callThrough();

            component.expandedIndexChange(3);

            expect(spyOnExpandedIdChanged).toHaveBeenCalledTimes(1);
            expect(spyOnExpandedIdChanged).toHaveBeenCalledWith(3);
        });
    });
});
