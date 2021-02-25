import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChangeRolesTableComponent } from './change-roles-table.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-change-roles-table></dsh-change-roles-table>`,
})
class HostComponent {}

describe('ChangeRolesTableComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: ChangeRolesTableComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, ChangeRolesTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(ChangeRolesTableComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('methods', () => {});

    describe('template', () => {});
});
