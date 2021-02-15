import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cold } from 'jasmine-marbles';

import { NestedTableColComponent } from '@dsh/components/nested-table/components/nested-table-col/nested-table-col.component';
import { NestedTableRowComponent } from '@dsh/components/nested-table/components/nested-table-row/nested-table-row.component';
import { LayoutManagementService } from '@dsh/components/nested-table/services/layout-management/layout-management.service';

import { NestedTableGroupComponent } from './nested-table-group.component';

@Component({
    selector: 'dsh-host',
    template: `
        <dsh-nested-table-group [displayedCount]="displayedCount">
            <dsh-nested-table-row *ngFor="let i of rows"></dsh-nested-table-row>
        </dsh-nested-table-group>
    `,
})
class HostComponent {
    displayedCount: number;
    rows = new Array(10).fill(null);
}

describe('NestedTableLimitedRowsComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: NestedTableGroupComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, CommonModule],
            declarations: [HostComponent, NestedTableGroupComponent, NestedTableRowComponent, NestedTableColComponent],
            providers: [LayoutManagementService],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(NestedTableGroupComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be init', () => {
        expect(component.showMoreDisplayed$).toBeObservable(cold('(a)', { a: false }));
        fixture.componentInstance.displayedCount = 2;
        fixture.detectChanges();
        expect(component.showMoreDisplayed$).toBeObservable(cold('(a)', { a: true }));
    });

    describe('showAll', () => {
        it('should showMoreDisplayed', () => {
            fixture.componentInstance.displayedCount = 2;
            component.showAll();
            fixture.detectChanges();
            expect(component.showMoreDisplayed$).toBeObservable(cold('(a)', { a: false }));
        });
    });

    describe('template rows', () => {
        it('should display all', () => {
            const rows = fixture.debugElement.queryAll(By.directive(NestedTableRowComponent));
            expect(rows.length).toBe(10);
            for (const row of rows) {
                expect((row.componentInstance as NestedTableRowComponent).hidden).toBeFalse();
            }
        });
        it('should display by limit', () => {
            fixture.componentInstance.displayedCount = 2;
            fixture.detectChanges();
            const rows = fixture.debugElement.queryAll(By.directive(NestedTableRowComponent));
            expect(rows.length).toBe(11);
            for (const row of rows.slice(0, 1)) {
                expect((row.componentInstance as NestedTableRowComponent).hidden).toBeFalse();
            }
            // TODO
            // for (const row of rows.slice(2, 9)) {
            //     expect((row.componentInstance as NestedTableRowComponent).hidden).toBeTrue();
            // }
            expect((rows[10].componentInstance as NestedTableRowComponent).hidden).toBeFalse();
        });
    });
});
