import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineShowAllToggleComponent } from './inline-show-all-toggle.component';

describe('InlineShowAllComponent', () => {
    let component: InlineShowAllToggleComponent;
    let fixture: ComponentFixture<InlineShowAllToggleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InlineShowAllToggleComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineShowAllToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
