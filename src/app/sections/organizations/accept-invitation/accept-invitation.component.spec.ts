import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AcceptInvitationComponent } from './accept-invitation.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-accept-invitation></dsh-accept-invitation>`,
})
class HostComponent {}

describe('AcceptInvitationComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: AcceptInvitationComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostComponent, AcceptInvitationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(AcceptInvitationComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
