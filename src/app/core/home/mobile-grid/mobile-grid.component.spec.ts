import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileGridComponent } from './mobile-grid.component';

describe('MobileGridComponent', () => {
    let component: MobileGridComponent;
    let fixture: ComponentFixture<MobileGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MobileGridComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
