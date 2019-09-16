import { Component, DebugElement } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { ShopDetailsComponent } from './shop-details.component';
import { DetailsItemComponent } from '../details-item';
import { LocalePipe } from '../../../locale/locale.pipe';
import { LocaleDictionaryService } from '../../../locale/locale-dictionary';
import { Shop } from '../../../api-codegen/capi/swagger-codegen';
import { ShopDetailsService } from './shop-details.service';
import { CardModule } from '../../../layout/card';
import { ShopLocationUrlComponent } from './shop-location-url';
import { ShopService } from '../../../api/shop';
import { LAYOUT_GAP } from '../../constants';

const dummyShop: Shop = {
    id: 'testID',
    createdAt: new Date(),
    isSuspended: false,
    isBlocked: false,
    categoryID: 1,
    location: {
        locationType: 'ShopLocationUrl',
        url: 'url.test'
    } as any,
    details: {
        name: 'TestShop'
    },
    contractID: 'testContract'
};

@Component({
    template: '<dsh-shop-details [shopID]="shopID"></dsh-shop-details>'
})
class TestShopDetailsComponent {
    shopID = 'test';
}

describe('ShopDetailsComponent', () => {
    let fixture: ComponentFixture<TestShopDetailsComponent>;
    let component: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule, CardModule],
            declarations: [
                DetailsItemComponent,
                ShopLocationUrlComponent,
                ShopDetailsComponent,
                TestShopDetailsComponent,
                LocalePipe
            ],
            providers: [
                { provide: LAYOUT_GAP, useValue: '20px' },
                {
                    provide: ShopService,
                    useValue: { getShopByID: (shopID: string): Observable<Shop> => of({ ...dummyShop, id: shopID }) }
                },
                ShopDetailsService,
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } }
            ]
        });

        fixture = TestBed.createComponent(TestShopDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.query(By.directive(ShopDetailsComponent));
    });

    it('should create component', () => {
        expect(component.nativeElement).toBeTruthy();
    });

    it('should contain shop name', () => {
        const name = component.query(By.directive(DetailsItemComponent)).nativeElement;
        expect(name.innerHTML).toContain('TestShop');
    });

    it('should show url', () => {
        const url = component.query(By.directive(ShopLocationUrlComponent)).nativeElement;
        expect(url).toBeTruthy();
    });
});
