import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopQueryFilterComponent } from './shop-query-filter.component';

describe('ShopNameFilterComponent', () => {
    let component: ShopQueryFilterComponent;
    let fixture: ComponentFixture<ShopQueryFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopQueryFilterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopQueryFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
