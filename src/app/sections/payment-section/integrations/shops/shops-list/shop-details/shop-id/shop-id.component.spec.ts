import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopIdComponent } from './shop-id.component';

describe('ShopIdComponent', () => {
    let component: ShopIdComponent;
    let fixture: ComponentFixture<ShopIdComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopIdComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopIdComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
