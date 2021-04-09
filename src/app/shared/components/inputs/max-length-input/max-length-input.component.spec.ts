import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaxLengthInputComponent } from './max-length-input.component';

describe('MaxLengthInputComponent', () => {
    let component: MaxLengthInputComponent;
    let fixture: ComponentFixture<MaxLengthInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
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
