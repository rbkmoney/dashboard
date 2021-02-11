import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NestedTableCollapseButtonComponent } from './nested-table-collapse-button.component';

@Component({
    selector: 'dsh-host',
    template: ` <dsh-nested-table-collapse-button></dsh-nested-table-collapse-button>`,
})
class HostComponent {}

describe('NestedTableGroupHeaderColComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: NestedTableCollapseButtonComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, NestedTableCollapseButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(NestedTableCollapseButtonComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
