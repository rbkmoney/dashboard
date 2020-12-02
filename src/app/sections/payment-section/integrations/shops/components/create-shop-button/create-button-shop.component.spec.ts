import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateButtonShopComponent } from './create-button-shop.component';

describe('CreateButtonComponent', () => {
    let component: CreateButtonShopComponent;
    let fixture: ComponentFixture<CreateButtonShopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateButtonShopComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateButtonShopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
