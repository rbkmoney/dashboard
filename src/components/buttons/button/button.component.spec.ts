import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ThemePalette } from '@angular/material/core';
import { By } from '@angular/platform-browser';

import { ButtonModule } from './index';

/** Test component that contains an DshButton. */
@Component({
    template: `
        <button
            [tabIndex]="tabIndex"
            dsh-button
            type="button"
            (click)="increment()"
            [disabled]="isDisabled"
            [color]="buttonColor"
        >
            Go
        </button>
    `,
})
class TestAppComponent {
    clickCount = 0;
    isDisabled = false;
    buttonColor: ThemePalette;
    tabIndex: number;

    increment() {
        this.clickCount += 1;
    }
}

describe('DshButton', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ButtonModule],
                declarations: [TestAppComponent],
            });

            TestBed.compileComponents();
        })
    );

    // General button tests
    it('should apply color class attribute', () => {
        const fixture = TestBed.createComponent(TestAppComponent);

        const testComponent = fixture.debugElement.componentInstance;
        const buttonDebugElement = fixture.debugElement.query(By.css('button'));

        testComponent.buttonColor = 'primary';
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('dsh-primary')).toBe(true);

        testComponent.buttonColor = 'accent';
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('dsh-accent')).toBe(true);

        testComponent.buttonColor = null;
        fixture.detectChanges();

        expect(buttonDebugElement.nativeElement.classList).not.toContain('dsh-accent');
    });

    it('should not clear previous defined classes', () => {
        const fixture = TestBed.createComponent(TestAppComponent);
        const testComponent = fixture.debugElement.componentInstance;
        const buttonDebugElement = fixture.debugElement.query(By.css('button'));

        buttonDebugElement.nativeElement.classList.add('custom-class');

        testComponent.buttonColor = 'primary';
        fixture.detectChanges();

        expect(buttonDebugElement.nativeElement.classList.contains('dsh-primary')).toBe(true);
        expect(buttonDebugElement.nativeElement.classList.contains('custom-class')).toBe(true);

        testComponent.buttonColor = 'accent';
        fixture.detectChanges();

        expect(buttonDebugElement.nativeElement.classList.contains('dsh-primary')).toBe(false);
        expect(buttonDebugElement.nativeElement.classList.contains('dsh-accent')).toBe(true);
        expect(buttonDebugElement.nativeElement.classList.contains('custom-class')).toBe(true);
    });

    // Regular button tests
    describe('button[dsh-button]', () => {
        it('should handle a click on the button', () => {
            const fixture = TestBed.createComponent(TestAppComponent);
            const testComponent = fixture.debugElement.componentInstance;
            const buttonDebugElement = fixture.debugElement.query(By.css('button'));

            buttonDebugElement.nativeElement.click();
            expect(testComponent.clickCount).toBe(1);
        });

        it('should not increment if disabled', () => {
            const fixture = TestBed.createComponent(TestAppComponent);
            const testComponent = fixture.debugElement.componentInstance;
            const buttonDebugElement = fixture.debugElement.query(By.css('button'));

            testComponent.isDisabled = true;
            fixture.detectChanges();

            buttonDebugElement.nativeElement.click();

            expect(testComponent.clickCount).toBe(0);
        });

        it('should disable the native button element', () => {
            const fixture = TestBed.createComponent(TestAppComponent);
            const buttonNativeElement = fixture.nativeElement.querySelector('button');
            expect(buttonNativeElement.disabled).toBeFalsy('Expected button not to be disabled');

            fixture.componentInstance.isDisabled = true;
            fixture.detectChanges();
            expect(buttonNativeElement.disabled).toBeTruthy('Expected button to be disabled');
        });
    });
});
