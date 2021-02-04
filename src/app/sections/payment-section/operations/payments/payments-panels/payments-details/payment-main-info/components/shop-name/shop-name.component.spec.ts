import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { getTextContent } from '@dsh/app/shared/tests/get-text-content';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { MockDetailsItemModule } from '../../../../../tests/mock-details-item-component';
import { ShopNameComponent } from './shop-name.component';

describe('ShopNameComponent', () => {
    let component: ShopNameComponent;
    let fixture: ComponentFixture<ShopNameComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MockDetailsItemModule],
            declarations: [ShopNameComponent],
        })
            .overrideComponent(ShopNameComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render provided shopName', () => {
            component.shopName = 'my shop name';

            fixture.detectChanges();

            const item = fixture.debugElement.query(By.css('dsh-details-item'));

            expect(getTextContent(item.nativeElement)).toBe('my shop name');
        });
    });
});
