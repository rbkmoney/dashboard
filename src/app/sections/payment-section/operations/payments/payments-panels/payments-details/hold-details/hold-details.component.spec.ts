import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldDetailsComponent } from './hold-details.component';

xdescribe('HoldComponent', () => {
    let component: HoldDetailsComponent;
    let fixture: ComponentFixture<HoldDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HoldDetailsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HoldDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
