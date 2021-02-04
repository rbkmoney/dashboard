import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToMajorModule } from '@dsh/app/shared/pipes';

import { BalanceComponent } from './balance.component';

const EMPTY_BALANCE_SYMBOL = '--/--';

describe('BalanceComponent', () => {
    let component: BalanceComponent;
    let fixture: ComponentFixture<BalanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToMajorModule],
            declarations: [BalanceComponent],
        })
            .overrideComponent(BalanceComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BalanceComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render empty balance symbol if amount is not a valid number or currency is empty', () => {
            component.amount = NaN;
            component.currency = 'USD';

            fixture.detectChanges();

            expect(fixture.nativeElement.textContent.trim()).toBe(EMPTY_BALANCE_SYMBOL);

            component.amount = 2;
            component.currency = '';

            fixture.detectChanges();

            expect(fixture.nativeElement.textContent.trim()).toBe(EMPTY_BALANCE_SYMBOL);
        });

        it('should render balance amount if amount and currency valid', () => {
            component.amount = 500;
            component.currency = 'USD';

            fixture.detectChanges();

            expect(fixture.nativeElement.textContent.trim()).toBe('$5.00');
        });
    });
});
