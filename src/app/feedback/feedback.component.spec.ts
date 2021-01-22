import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { FeedbackComponent } from './feedback.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-feedback></dsh-feedback>`,
})
class HostComponent {}

describe('FeedbackComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: FeedbackComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [HostComponent, FeedbackComponent],
            providers: [{ provide: DIALOG_CONFIG, useValue: {} }],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(FeedbackComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
