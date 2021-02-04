import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToMajorModule } from '@dsh/app/shared/pipes';

import { generateMockBalance } from '../../tests/generate-mock-balance';
import { generateMockShop } from '../../tests/generate-mock-shop';
import { ShopBalanceComponent } from './shop-balance.component';

const EMPTY_BALANCE_SYMBOL = '--/--';

describe('ShopBalanceComponent', () => {
    let component: ShopBalanceComponent;
    let fixture: ComponentFixture<ShopBalanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToMajorModule],
            declarations: [ShopBalanceComponent],
        })
            .overrideComponent(ShopBalanceComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopBalanceComponent);
        component = fixture.componentInstance;

        const shop = generateMockShop(1);
        component.shop = {
            ...shop,
            balance: null,
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render empty balance symbol if balance data is null', () => {
            const shop = generateMockShop(1);
            component.shop = {
                ...shop,
                balance: null,
            };

            fixture.detectChanges();

            expect(fixture.nativeElement.textContent.trim()).toBe(EMPTY_BALANCE_SYMBOL);
        });

        it('should render balance amount if balance data exists', () => {
            const { data } = generateMockBalance(1, 500);
            const shop = generateMockShop(1);
            component.shop = {
                ...shop,
                balance: data,
            };

            fixture.detectChanges();

            expect(fixture.nativeElement.textContent.trim()).toBe('$5.00');
        });
    });
});
