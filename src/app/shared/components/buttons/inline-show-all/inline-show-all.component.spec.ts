import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineShowAllComponent } from './inline-show-all.component';

describe('InlineShowAllComponent', () => {
    let component: InlineShowAllComponent;
    let fixture: ComponentFixture<InlineShowAllComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InlineShowAllComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineShowAllComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
