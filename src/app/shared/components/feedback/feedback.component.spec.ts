import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
            imports: [],
            declarations: [HostComponent, FeedbackComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(FeedbackComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('methods', () => {});

    describe('template', () => {});
});
