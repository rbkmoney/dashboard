import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableRadioGroupComponent } from './expandable-radio-group.component';

describe('ExpandableRadioGroupComponent', () => {
    let component: ExpandableRadioGroupComponent;
    let fixture: ComponentFixture<ExpandableRadioGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpandableRadioGroupComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpandableRadioGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
