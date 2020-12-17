import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import { NoContentModule } from '@dsh/app/shared/directives';
import { ButtonModule } from '@dsh/components/buttons';

import { BaseDialogComponent } from './base-dialog.component';

describe('BaseDialogComponent', () => {
    let component: BaseDialogComponent;
    let fixture: ComponentFixture<BaseDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDividerModule, ButtonModule, NoContentModule, FlexLayoutModule],
            declarations: [BaseDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('cancelDialog', () => {
        it('should emit cancel event', () => {
            const spyOnCancel = spyOn(component.cancel, 'emit').and.callThrough();

            component.cancelDialog();

            expect(spyOnCancel).toHaveBeenCalledTimes(1);
        });
    });

    describe('confirmDialog', () => {
        it('should emit confirm event', () => {
            const spyOnConfirm = spyOn(component.confirm, 'emit').and.callThrough();

            component.confirmDialog();

            expect(spyOnConfirm).toHaveBeenCalledTimes(1);
        });
    });
});
