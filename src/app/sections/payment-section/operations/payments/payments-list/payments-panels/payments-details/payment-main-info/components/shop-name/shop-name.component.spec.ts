import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNameComponent } from './shop-name.component';

xdescribe('ShopNameComponent', () => {
    let component: ShopNameComponent;
    let fixture: ComponentFixture<ShopNameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopNameComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
