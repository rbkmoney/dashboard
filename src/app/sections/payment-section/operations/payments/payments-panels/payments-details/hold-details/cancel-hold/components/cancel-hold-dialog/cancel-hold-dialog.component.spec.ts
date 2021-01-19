import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelHoldDialogComponent } from './cancel-hold-dialog.component';

xdescribe('CancelHoldDialogComponent', () => {
    let component: CancelHoldDialogComponent;
    let fixture: ComponentFixture<CancelHoldDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CancelHoldDialogComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CancelHoldDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
