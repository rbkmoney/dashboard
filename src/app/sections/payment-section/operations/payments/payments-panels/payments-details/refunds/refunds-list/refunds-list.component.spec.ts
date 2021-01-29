import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSearchResult } from '@dsh/api-codegen/capi';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { RefundsListComponent } from './refunds-list.component';

describe('RefundsListComponent', () => {
    let component: RefundsListComponent;
    let fixture: ComponentFixture<RefundsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            declarations: [RefundsListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RefundsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('isEmptyList', () => {
        it('should return true if list is undefined', () => {
            component.list = undefined;

            expect(component.isEmptyList).toBe(true);
        });

        it('should return true if list has no elements', () => {
            component.list = [];

            expect(component.isEmptyList).toBe(true);
        });

        it('should return false if list has at least one element', () => {
            component.list = new Array(1).fill({
                id: 'mine',
                createdAt: new Date(),
                amount: 200,
                currency: 'USD',
                status: RefundSearchResult.StatusEnum.Failed,
                invoiceID: 'invoiceID',
                paymentID: 'paymentID',
            });

            expect(component.isEmptyList).toBe(false);
        });
    });

    describe('showMoreElements', () => {
        it('should emit showMore event', () => {
            const spyOnShowMore = spyOn(component.showMore, 'emit');

            component.showMoreElements();

            expect(spyOnShowMore).toHaveBeenCalledTimes(1);
        });
    });
});
