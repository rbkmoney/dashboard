import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHoldDialogComponent } from './create-hold-dialog.component';

xdescribe('CreateHoldDialogComponent', () => {
    let component: CreateHoldDialogComponent;
    let fixture: ComponentFixture<CreateHoldDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateHoldDialogComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateHoldDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
