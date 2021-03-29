import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ApiShopsService } from '@dsh/api';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

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
            imports: [CommonModule, ReactiveFormsModule],
            declarations: [HostComponent, ChangeRolesTableComponent],
            providers: [
                provideMockService(ApiShopsService),
                provideMockService(MatDialog),
                provideMockToken(DIALOG_CONFIG, {} as DialogConfig),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(ChangeRolesTableComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
