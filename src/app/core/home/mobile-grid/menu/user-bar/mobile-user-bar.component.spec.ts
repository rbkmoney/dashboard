import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserBarComponent } from './mobile-user-bar.component';

describe('MobileUserBarComponent', () => {
    let component: MobileUserBarComponent;
    let fixture: ComponentFixture<MobileUserBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MobileUserBarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileUserBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
