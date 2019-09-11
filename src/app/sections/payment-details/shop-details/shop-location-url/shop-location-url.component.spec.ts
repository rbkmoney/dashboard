import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShopLocationUrlComponent } from './shop-location-url.component';
import { LocaleDictionaryService } from '../../../../locale/locale-dictionary';
import { LocalePipe } from '../../../../locale/locale.pipe';
import { ShopLocationUrl } from '../../../../api-codegen/capi/swagger-codegen';
import { DetailsItemComponent } from '../../details-item';


describe('ShopLocationUrlComponent', () => {

    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule],
            declarations: [DetailsItemComponent, ShopLocationUrlComponent, TestShopLocationUrlComponent, LocalePipe],
            providers: [
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: (value) => value } }
            ]
        });

        const fixture = TestBed.createComponent(TestShopLocationUrlComponent);
        fixture.detectChanges();
        component = fixture.nativeElement.querySelector('dsh-shop-location-url');
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should contain url', () => {
        expect(component.innerHTML).toContain('url.test');
    });

});

@Component({
    template: '<dsh-shop-location-url [shopLocationUrl]="shopLocationUrl"></dsh-shop-location-url>'
})
class TestShopLocationUrlComponent {
    shopLocationUrl: ShopLocationUrl = {
        locationType: 'ShopLocationUrl',
        url: 'url.test'
    };
}
