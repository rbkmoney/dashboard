import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxLengthInputComponent } from './max-length-input.component';

describe('MaxLengthInputComponent', () => {
    let component: MaxLengthInputComponent;
    let fixture: ComponentFixture<MaxLengthInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MaxLengthInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MaxLengthInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
