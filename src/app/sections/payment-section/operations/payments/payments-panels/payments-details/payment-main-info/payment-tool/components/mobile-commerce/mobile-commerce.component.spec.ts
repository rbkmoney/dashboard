import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCommerceComponent } from './mobile-commerce.component';

describe('MobileCommerceComponent', () => {
    let fixture: ComponentFixture<MobileCommerceComponent>;
    let component: MobileCommerceComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MobileCommerceComponent],
        })
            .overrideComponent(MobileCommerceComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileCommerceComponent);
        component = fixture.componentInstance;
        component.details = {
            phoneNumber: '88008008888',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
