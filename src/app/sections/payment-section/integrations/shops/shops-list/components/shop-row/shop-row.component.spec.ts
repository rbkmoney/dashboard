import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RowModule } from '@dsh/components/layout';

import { ShopBalanceModule } from '../../shop-balance';
import { ShopRowComponent } from './shop-row.component';

describe('ShopRowComponent', () => {
    let fixture: ComponentFixture<ShopRowComponent>;
    let component: ShopRowComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RowModule, ShopBalanceModule],
            declarations: [ShopRowComponent],
        })
            .overrideComponent(ShopRowComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should show loading value if shop was not provided', () => {
            const labels = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-label'));

            expect(labels.length).toBe(1);
            expect(labels[0].nativeElement.textContent.trim()).toBe('Loading ...');
        });

        // it('should show balances component if shop was provided', () => {
        //     const { data } = generateMockBalance(1, 20);
        //     const shop = generateMockShop(1);
        //     component.shop = {
        //         ...shop,
        //         balance: data,
        //     };
        //
        //     fixture.detectChanges();
        //
        //     const labels = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-label'));
        //
        //     expect(labels.length).toBe(2);
        //     expect(labels[0].nativeElement.textContent.trim()).toBe(shop.details.name);
        //     expect(labels[1].nativeElement.textContent.trim()).toBe(`$0.20`);
        // });
    });
});
