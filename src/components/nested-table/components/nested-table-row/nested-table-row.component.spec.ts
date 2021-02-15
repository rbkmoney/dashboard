import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';

import { NestedTableColComponent } from '@dsh/components/nested-table/components/nested-table-col/nested-table-col.component';
import { LayoutManagementService } from '@dsh/components/nested-table/services/layout-management/layout-management.service';

import { NestedTableRowComponent } from './nested-table-row.component';

@Component({
    selector: 'dsh-host',
    template: `
        <dsh-nested-table-row>
            <dsh-nested-table-col></dsh-nested-table-col>
            <dsh-nested-table-col></dsh-nested-table-col>
            <dsh-nested-table-col></dsh-nested-table-col>
        </dsh-nested-table-row>
    `,
})
class HostComponent {}

describe('NestedTableRowComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: NestedTableRowComponent;
    let layoutManagementService: LayoutManagementService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostComponent, NestedTableRowComponent, NestedTableColComponent],
            providers: [LayoutManagementService],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(NestedTableRowComponent));
        component = debugElement.componentInstance;
        layoutManagementService = TestBed.inject(LayoutManagementService);

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be init', () => {
        expect(component.colsCount$).toBeObservable(cold('(a)', { a: 3 }));
        layoutManagementService.setLayoutColsCount(4);
        expect(component.fillCols$).toBeObservable(cold('(a)', { a: [null] }));
    });
});
