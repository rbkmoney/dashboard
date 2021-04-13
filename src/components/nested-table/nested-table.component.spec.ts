import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { anything, mock, verify, when } from 'ts-mockito';

import { provideMockService } from '@dsh/app/shared/tests';
import { NestedTableColComponent } from '@dsh/components/nested-table/components/nested-table-col/nested-table-col.component';
import { NestedTableRowComponent } from '@dsh/components/nested-table/components/nested-table-row/nested-table-row.component';
import { LayoutManagementService } from '@dsh/components/nested-table/services/layout-management/layout-management.service';

import { NestedTableComponent } from './nested-table.component';

@Component({
    selector: 'dsh-host',
    template: `
        <dsh-nested-table [rowsGridTemplateColumns]="rowsGridTemplateColumns">
            <dsh-nested-table-row>
                <dsh-nested-table-col></dsh-nested-table-col>
            </dsh-nested-table-row>
            <dsh-nested-table-row>
                <dsh-nested-table-col></dsh-nested-table-col>
                <dsh-nested-table-col></dsh-nested-table-col>
                <dsh-nested-table-col></dsh-nested-table-col>
            </dsh-nested-table-row>
        </dsh-nested-table>
    `,
})
class HostComponent {
    rowsGridTemplateColumns;
}

describe('NestedTableComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: NestedTableComponent;
    let mockLayoutManagementService: LayoutManagementService;

    beforeEach(async () => {
        mockLayoutManagementService = mock(LayoutManagementService);
        when(mockLayoutManagementService.gridTemplateColumns$).thenReturn(of(''));
        when(mockLayoutManagementService.getFillCols(anything())).thenReturn(of(['']));

        await TestBed.configureTestingModule({
            imports: [CommonModule, NoopAnimationsModule],
            declarations: [HostComponent, NestedTableComponent, NestedTableRowComponent, NestedTableColComponent],
        })
            .overrideComponent(NestedTableComponent, {
                set: {
                    providers: [provideMockService(LayoutManagementService, mockLayoutManagementService)],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(NestedTableComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('init', () => {
        it('should be setRowsGridTemplateColumns & setLayoutColsCount', () => {
            verify(mockLayoutManagementService.setRowsGridTemplateColumns(undefined)).once();
            fixture.componentInstance.rowsGridTemplateColumns = '1fr 1fr';
            fixture.detectChanges();
            verify(mockLayoutManagementService.setRowsGridTemplateColumns('1fr 1fr')).once();
            verify(mockLayoutManagementService.setLayoutColsCount(3)).once();
            expect().nothing();
        });
    });
});
