import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InvitationsListComponent } from './invitations-list.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-invitations-list></dsh-invitations-list>`,
})
class HostComponent {}

describe('InvitationsListComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: InvitationsListComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, InvitationsListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(InvitationsListComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
