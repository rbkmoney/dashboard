import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFiltersComponent } from './shop-filters.component';

describe('ShopFiltersComponent', () => {
    let component: ShopFiltersComponent;
    let fixture: ComponentFixture<ShopFiltersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopFiltersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
