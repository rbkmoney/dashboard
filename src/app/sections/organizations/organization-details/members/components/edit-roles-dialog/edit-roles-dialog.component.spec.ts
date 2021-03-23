import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EditRolesDialogComponent } from './edit-roles-dialog.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-edit-roles-dialog></dsh-edit-roles-dialog>`,
})
class HostComponent {}

describe('EditRolesDialogComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: EditRolesDialogComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, EditRolesDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(EditRolesDialogComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('methods', () => {});

    describe('template', () => {});
});
