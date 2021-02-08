import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InvitationComponent } from './invitation.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-invitation></dsh-invitation>`,
})
class HostComponent {}

describe('InvitationComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: InvitationComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, InvitationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(InvitationComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
