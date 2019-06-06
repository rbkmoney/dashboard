import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DshButtonToggleComponent, DshButtonToggleGroupDirective, DshButtonToggleModule } from './index';
import {
    ButtonToggleGroupWithInitialValueComponent,
    ButtonTogglesInsideButtonToggleGroupComponent,
    ButtonTogglesInsideButtonToggleGroupMultipleComponent,
    ButtonToggleWithAriaLabelComponent,
    ButtonToggleWithAriaLabelledbyComponent,
    ButtonToggleWithStaticNameComponent,
    FalsyButtonTogglesInsideButtonToggleGroupMultipleComponent,
    RepeatedButtonTogglesWithPreselectedValueComponent,
    StandaloneButtonToggleComponent
} from './button-toggle.components.spec';

describe('DshButtonToggle without forms', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [DshButtonToggleModule],
            declarations: [
                ButtonTogglesInsideButtonToggleGroupComponent,
                ButtonTogglesInsideButtonToggleGroupMultipleComponent,
                FalsyButtonTogglesInsideButtonToggleGroupMultipleComponent,
                ButtonToggleGroupWithInitialValueComponent,
                StandaloneButtonToggleComponent,
                ButtonToggleWithAriaLabelComponent,
                ButtonToggleWithAriaLabelledbyComponent,
                RepeatedButtonTogglesWithPreselectedValueComponent,
                ButtonToggleWithStaticNameComponent
            ]
        });

        TestBed.compileComponents();
    }));

    describe('inside of an exclusive selection group', () => {
        let fixture: ComponentFixture<ButtonTogglesInsideButtonToggleGroupComponent>;
        let groupDebugElement: DebugElement;
        let groupNativeElement: HTMLElement;
        let buttonToggleDebugElements: DebugElement[];
        let buttonToggleNativeElements: HTMLElement[];
        let buttonToggleLabelElements: HTMLLabelElement[];
        let groupInstance: DshButtonToggleGroupDirective;
        let buttonToggleInstances: DshButtonToggleComponent[];
        let testComponent: ButtonTogglesInsideButtonToggleGroupComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ButtonTogglesInsideButtonToggleGroupComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            groupDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleGroupDirective));
            groupNativeElement = groupDebugElement.nativeElement;
            groupInstance = groupDebugElement.injector.get<DshButtonToggleGroupDirective>(
                DshButtonToggleGroupDirective
            );

            buttonToggleDebugElements = fixture.debugElement.queryAll(By.directive(DshButtonToggleComponent));

            buttonToggleNativeElements = buttonToggleDebugElements.map(debugEl => debugEl.nativeElement);

            buttonToggleLabelElements = fixture.debugElement
                .queryAll(By.css('button'))
                .map(debugEl => debugEl.nativeElement);

            buttonToggleInstances = buttonToggleDebugElements.map(debugEl => debugEl.componentInstance);
        });

        it('should set individual button toggle names based on the group name', () => {
            expect(groupInstance.name).toBeTruthy();
            for (const buttonToggle of buttonToggleInstances) {
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
        });

        it('should disable click interactions when the group is disabled', () => {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();

            buttonToggleNativeElements[0].click();
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[0].disabled).toBe(true);

            testComponent.isGroupDisabled = false;
            fixture.detectChanges();

            expect(buttonToggleInstances[0].disabled).toBe(false);

            buttonToggleLabelElements[0].click();
            fixture.detectChanges();

            expect(buttonToggleInstances[0].checked).toBe(true);
        });

        it('should disable the underlying button when the group is disabled', () => {
            const buttons = buttonToggleNativeElements.map(toggle => toggle.querySelector('button'));

            expect(buttons.every(input => input.disabled)).toBe(false);

            testComponent.isGroupDisabled = true;
            fixture.detectChanges();

            expect(buttons.every(input => input.disabled)).toBe(true);
        });

        it('should update the group value when one of the toggles changes', () => {
            expect(groupInstance.value).toBeFalsy();
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();

            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
        });

        it('should propagate the value change back up via a two-way binding', () => {
            expect(groupInstance.value).toBeFalsy();
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();

            expect(groupInstance.value).toBe('test1');
            expect(testComponent.groupValue).toBe('test1');
        });

        it('should update the group and toggles when one of the button toggles is clicked', () => {
            expect(groupInstance.value).toBeFalsy();
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();

            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(buttonToggleInstances[1].checked).toBe(false);

            buttonToggleLabelElements[1].click();
            fixture.detectChanges();

            expect(groupInstance.value).toBe('test2');
            expect(groupInstance.selected).toBe(buttonToggleInstances[1]);
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[1].checked).toBe(true);
        });

        it('should check a button toggle upon interaction with underlying native radio button', () => {
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();

            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(groupInstance.value);
        });

        it('should change the vertical state', () => {
            expect(groupNativeElement.classList).not.toContain('dsh-button-toggle-vertical');

            groupInstance.vertical = true;
            fixture.detectChanges();

            expect(groupNativeElement.classList).toContain('dsh-button-toggle-vertical');
        });

        it('should emit a change event from button toggles', fakeAsync(() => {
            expect(buttonToggleInstances[0].checked).toBe(false);

            const changeSpy = jasmine.createSpy('button-toggle change listener');
            buttonToggleInstances[0].change.subscribe(changeSpy);

            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            tick();
            expect(changeSpy).toHaveBeenCalledTimes(1);

            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            tick();

            // Always emit change event when button toggle is clicked
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));

        it('should emit a change event from the button toggle group', fakeAsync(() => {
            expect(groupInstance.value).toBeFalsy();

            const changeSpy = jasmine.createSpy('button-toggle-group change listener');
            groupInstance.change.subscribe(changeSpy);

            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            tick();
            expect(changeSpy).toHaveBeenCalled();

            buttonToggleLabelElements[1].click();
            fixture.detectChanges();
            tick();
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));

        it('should update the group and button toggles when updating the group value', () => {
            expect(groupInstance.value).toBeFalsy();

            testComponent.groupValue = 'test1';
            fixture.detectChanges();

            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(buttonToggleInstances[1].checked).toBe(false);

            testComponent.groupValue = 'test2';
            fixture.detectChanges();

            expect(groupInstance.value).toBe('test2');
            expect(groupInstance.selected).toBe(buttonToggleInstances[1]);
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[1].checked).toBe(true);
        });

        it('should deselect all of the checkboxes when the group value is cleared', () => {
            buttonToggleInstances[0].checked = true;

            expect(groupInstance.value).toBeTruthy();

            groupInstance.value = null;

            expect(buttonToggleInstances.every(toggle => !toggle.checked)).toBe(true);
        });

        it('should update the model if a selected toggle is removed', fakeAsync(() => {
            expect(groupInstance.value).toBeFalsy();
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();

            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);

            testComponent.renderFirstToggle = false;
            fixture.detectChanges();
            tick();

            expect(groupInstance.value).toBeFalsy();
            expect(groupInstance.selected).toBeFalsy();
        }));
    });

    describe('with initial value and change event', () => {
        it('should not fire an initial change event', () => {
            const fixture = TestBed.createComponent(ButtonToggleGroupWithInitialValueComponent);
            const testComponent = fixture.debugElement.componentInstance;
            const groupDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleGroupDirective));
            const groupInstance: DshButtonToggleGroupDirective = groupDebugElement.injector.get<
                DshButtonToggleGroupDirective
            >(DshButtonToggleGroupDirective);

            fixture.detectChanges();

            // Note that we cast to a boolean, because the event has some circular references
            // which will crash the runner when Jasmine attempts to stringify them.
            expect(!!testComponent.lastEvent).toBe(false);
            expect(groupInstance.value).toBe('red');

            groupInstance.value = 'green';
            fixture.detectChanges();

            expect(!!testComponent.lastEvent).toBe(false);
            expect(groupInstance.value).toBe('green');
        });
    });

    describe('inside of a multiple selection group', () => {
        let fixture: ComponentFixture<ButtonTogglesInsideButtonToggleGroupMultipleComponent>;
        let groupDebugElement: DebugElement;
        let groupNativeElement: HTMLElement;
        let buttonToggleDebugElements: DebugElement[];
        let buttonToggleNativeElements: HTMLElement[];
        let buttonToggleLabelElements: HTMLLabelElement[];
        let groupInstance: DshButtonToggleGroupDirective;
        let buttonToggleInstances: DshButtonToggleComponent[];
        let testComponent: ButtonTogglesInsideButtonToggleGroupMultipleComponent;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ButtonTogglesInsideButtonToggleGroupMultipleComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            groupDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleGroupDirective));
            groupNativeElement = groupDebugElement.nativeElement;
            groupInstance = groupDebugElement.injector.get<DshButtonToggleGroupDirective>(
                DshButtonToggleGroupDirective
            );

            buttonToggleDebugElements = fixture.debugElement.queryAll(By.directive(DshButtonToggleComponent));
            buttonToggleNativeElements = buttonToggleDebugElements.map(debugEl => debugEl.nativeElement);
            buttonToggleLabelElements = fixture.debugElement
                .queryAll(By.css('button'))
                .map(debugEl => debugEl.nativeElement);
            buttonToggleInstances = buttonToggleDebugElements.map(debugEl => debugEl.componentInstance);
        }));

        it('should disable click interactions when the group is disabled', () => {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();

            buttonToggleNativeElements[0].click();
            expect(buttonToggleInstances[0].checked).toBe(false);
        });

        it('should check a button toggle when clicked', () => {
            expect(buttonToggleInstances.every(buttonToggle => !buttonToggle.checked)).toBe(true);

            const nativeCheckboxLabel = buttonToggleDebugElements[0].query(By.css('button')).nativeElement;

            nativeCheckboxLabel.click();

            expect(groupInstance.value).toEqual(['eggs']);
            expect(buttonToggleInstances[0].checked).toBe(true);
        });

        it('should allow for multiple toggles to be selected', () => {
            buttonToggleInstances[0].checked = true;
            fixture.detectChanges();

            expect(groupInstance.value).toEqual(['eggs']);
            expect(buttonToggleInstances[0].checked).toBe(true);

            buttonToggleInstances[1].checked = true;
            fixture.detectChanges();

            expect(groupInstance.value).toEqual(['eggs', 'flour']);
            expect(buttonToggleInstances[1].checked).toBe(true);
            expect(buttonToggleInstances[0].checked).toBe(true);
        });

        it('should check a button toggle upon interaction with underlying native checkbox', () => {
            const nativeCheckboxButton = buttonToggleDebugElements[0].query(By.css('button')).nativeElement;

            nativeCheckboxButton.click();
            fixture.detectChanges();

            expect(groupInstance.value).toEqual(['eggs']);
            expect(buttonToggleInstances[0].checked).toBe(true);
        });

        it('should change the vertical state', () => {
            expect(groupNativeElement.classList).not.toContain('dsh-button-toggle-vertical');

            groupInstance.vertical = true;
            fixture.detectChanges();

            expect(groupNativeElement.classList).toContain('dsh-button-toggle-vertical');
        });

        it('should deselect a button toggle when selected twice', fakeAsync(() => {
            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            tick();

            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(groupInstance.value).toEqual(['eggs']);

            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            tick();

            expect(groupInstance.value).toEqual([]);
            expect(buttonToggleInstances[0].checked).toBe(false);
        }));

        it('should emit a change event for state changes', fakeAsync(() => {
            expect(buttonToggleInstances[0].checked).toBe(false);

            const changeSpy = jasmine.createSpy('button-toggle change listener');
            buttonToggleInstances[0].change.subscribe(changeSpy);

            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            tick();
            expect(changeSpy).toHaveBeenCalled();
            expect(groupInstance.value).toEqual(['eggs']);

            buttonToggleLabelElements[0].click();
            fixture.detectChanges();
            tick();
            expect(groupInstance.value).toEqual([]);

            // The default browser behavior is to emit an event, when the value was set
            // to false. That's because the current input type is set to `checkbox` when
            // using the multiple mode.
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));

        it('should throw when attempting to assign a non-array value', () => {
            expect(() => {
                groupInstance.value = 'not-an-array';
            }).toThrowError(/Value must be an array/);
        });

        // it('should be able to query for the deprecated `DshButtonToggleGroupDirectiveMultiple`', () => {
        //     expect(fixture.debugElement.query(By.directive(DshButtonToggleGroupMultiple))).toBeTruthy();
        // });
    });

    describe('as standalone', () => {
        let fixture: ComponentFixture<StandaloneButtonToggleComponent>;
        let buttonToggleDebugElement: DebugElement;
        let buttonToggleNativeElement: HTMLElement;
        let buttonToggleLabelElement: HTMLLabelElement;
        let buttonToggleInstance: DshButtonToggleComponent;
        let buttonToggleButtonElement: HTMLButtonElement;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(StandaloneButtonToggleComponent);
            fixture.detectChanges();

            buttonToggleDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleComponent));
            buttonToggleNativeElement = buttonToggleDebugElement.nativeElement;
            buttonToggleLabelElement = fixture.debugElement.query(By.css('.dsh-button-toggle-label-content'))
                .nativeElement;
            buttonToggleInstance = buttonToggleDebugElement.componentInstance;
            buttonToggleButtonElement = buttonToggleNativeElement.querySelector('button') as HTMLButtonElement;
        }));

        it('should toggle when clicked', fakeAsync(() => {
            buttonToggleLabelElement.click();
            fixture.detectChanges();
            flush();

            expect(buttonToggleInstance.checked).toBe(true);

            buttonToggleLabelElement.click();
            fixture.detectChanges();
            flush();

            expect(buttonToggleInstance.checked).toBe(false);
        }));

        it('should emit a change event for state changes', fakeAsync(() => {
            expect(buttonToggleInstance.checked).toBe(false);

            const changeSpy = jasmine.createSpy('button-toggle change listener');
            buttonToggleInstance.change.subscribe(changeSpy);

            buttonToggleLabelElement.click();
            fixture.detectChanges();
            tick();
            expect(changeSpy).toHaveBeenCalled();

            buttonToggleLabelElement.click();
            fixture.detectChanges();
            tick();

            // The default browser behavior is to emit an event, when the value was set
            // to false. That's because the current input type is set to `checkbox`.
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));

        it('should focus on underlying input element when focus() is called', () => {
            const nativeButton = buttonToggleDebugElement.query(By.css('button')).nativeElement;
            expect(document.activeElement).not.toBe(nativeButton);

            buttonToggleInstance.focus();
            fixture.detectChanges();

            expect(document.activeElement).toBe(nativeButton);
        });

        it('should not assign a name to the underlying input if one is not passed in', () => {
            expect(buttonToggleButtonElement.getAttribute('name')).toBeFalsy();
        });

        it('should have correct aria-pressed attribute', () => {
            expect(buttonToggleButtonElement.getAttribute('aria-pressed')).toBe('false');

            buttonToggleLabelElement.click();

            fixture.detectChanges();

            expect(buttonToggleButtonElement.getAttribute('aria-pressed')).toBe('true');
        });
    });

    describe('aria-label handling ', () => {
        it('should not set the aria-label attribute if none is provided', () => {
            const fixture = TestBed.createComponent(StandaloneButtonToggleComponent);
            const checkboxDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleComponent));
            const checkboxNativeElement = checkboxDebugElement.nativeElement;
            const buttonElement = checkboxNativeElement.querySelector('button') as HTMLButtonElement;

            fixture.detectChanges();
            expect(buttonElement.hasAttribute('aria-label')).toBe(false);
        });

        it('should use the provided aria-label', () => {
            const fixture = TestBed.createComponent(ButtonToggleWithAriaLabelComponent);
            const checkboxDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleComponent));
            const checkboxNativeElement = checkboxDebugElement.nativeElement;
            const buttonElement = checkboxNativeElement.querySelector('button') as HTMLButtonElement;

            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-label')).toBe('Super effective');
        });
    });

    describe('with provided aria-labelledby ', () => {
        let checkboxDebugElement: DebugElement;
        let checkboxNativeElement: HTMLElement;
        let buttonElement: HTMLButtonElement;

        it('should use the provided aria-labelledby', () => {
            const fixture = TestBed.createComponent(ButtonToggleWithAriaLabelledbyComponent);
            checkboxDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleComponent));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            buttonElement = checkboxNativeElement.querySelector('button') as HTMLButtonElement;

            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-labelledby')).toBe('some-id');
        });

        it('should not assign aria-labelledby if none is provided', () => {
            const fixture = TestBed.createComponent(StandaloneButtonToggleComponent);
            checkboxDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleComponent));
            checkboxNativeElement = checkboxDebugElement.nativeElement;
            buttonElement = checkboxNativeElement.querySelector('button') as HTMLButtonElement;

            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-labelledby')).toBe(null);
        });
    });

    it('should not throw on init when toggles are repeated and there is an initial value', () => {
        const fixture = TestBed.createComponent(RepeatedButtonTogglesWithPreselectedValueComponent);

        expect(() => fixture.detectChanges()).not.toThrow();
        expect(fixture.componentInstance.toggleGroup.value).toBe('Two');
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(true);
    });

    it('should not throw on init when toggles are repeated and there is an initial value', () => {
        const fixture = TestBed.createComponent(ButtonToggleWithStaticNameComponent);
        fixture.detectChanges();

        const hostNode: HTMLElement = fixture.nativeElement.querySelector('.dsh-button-toggle');

        expect(hostNode.hasAttribute('name')).toBe(true);
        expect(hostNode.querySelector('button').getAttribute('name')).toBe('custom-name');
    });

    it('should maintain the selected state when the value and toggles are swapped out at ' + 'the same time', () => {
        const fixture = TestBed.createComponent(RepeatedButtonTogglesWithPreselectedValueComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance.toggleGroup.value).toBe('Two');
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(true);

        fixture.componentInstance.possibleValues = ['Five', 'Six', 'Seven'];
        fixture.componentInstance.value = 'Seven';
        fixture.detectChanges();

        expect(fixture.componentInstance.toggleGroup.value).toBe('Seven');
        expect(fixture.componentInstance.toggles.toArray()[2].checked).toBe(true);
    });

    it('should select falsy button toggle value in multiple selection', () => {
        const fixture = TestBed.createComponent(FalsyButtonTogglesInsideButtonToggleGroupMultipleComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance.toggles.toArray()[0].checked).toBe(true);
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(false);
        expect(fixture.componentInstance.toggles.toArray()[2].checked).toBe(false);

        fixture.componentInstance.value = [0, false];
        fixture.detectChanges();

        expect(fixture.componentInstance.toggles.toArray()[0].checked).toBe(true);
        expect(fixture.componentInstance.toggles.toArray()[1].checked).toBe(false);
        expect(fixture.componentInstance.toggles.toArray()[2].checked).toBe(true);
    });
});
