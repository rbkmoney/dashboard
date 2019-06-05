import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DshButtonToggleModule } from './button-toggle.module';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { DshButtonToggleComponent, DshButtonToggleGroupDirective } from './button-toggle';
import { By } from '@angular/platform-browser';
import {
    ButtonToggleGroupWithFormControlComponent,
    ButtonToggleGroupWithNgModelComponent
} from './button-toggle.components.spec';

describe('DshButtonToggle with forms', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [DshButtonToggleModule, FormsModule, ReactiveFormsModule],
            declarations: [ButtonToggleGroupWithNgModelComponent, ButtonToggleGroupWithFormControlComponent]
        });

        TestBed.compileComponents();
    }));

    describe('using FormControl', () => {
        let fixture: ComponentFixture<ButtonToggleGroupWithFormControlComponent>;
        let groupDebugElement: DebugElement;
        let groupInstance: DshButtonToggleGroupDirective;
        let testComponent: ButtonToggleGroupWithFormControlComponent;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ButtonToggleGroupWithFormControlComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            groupDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleGroupDirective));
            groupInstance = groupDebugElement.injector.get<DshButtonToggleGroupDirective>(
                DshButtonToggleGroupDirective
            );
        }));

        it('should toggle the disabled state', () => {
            testComponent.control.disable();

            expect(groupInstance.disabled).toBe(true);

            testComponent.control.enable();

            expect(groupInstance.disabled).toBe(false);
        });

        it('should set the value', () => {
            testComponent.control.setValue('green');

            expect(groupInstance.value).toBe('green');

            testComponent.control.setValue('red');

            expect(groupInstance.value).toBe('red');
        });

        it('should register the on change callback', () => {
            const spy = jasmine.createSpy('onChange callback');

            testComponent.control.registerOnChange(spy);
            testComponent.control.setValue('blue');

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('button toggle group with ngModel and change event', () => {
        let fixture: ComponentFixture<ButtonToggleGroupWithNgModelComponent>;
        let groupDebugElement: DebugElement;
        let buttonToggleDebugElements: DebugElement[];
        let groupInstance: DshButtonToggleGroupDirective;
        let buttonToggleInstances: DshButtonToggleComponent[];
        let testComponent: ButtonToggleGroupWithNgModelComponent;
        let groupNgModel: NgModel;
        let innerButtons: HTMLElement[];

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ButtonToggleGroupWithNgModelComponent);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;

            groupDebugElement = fixture.debugElement.query(By.directive(DshButtonToggleGroupDirective));
            groupInstance = groupDebugElement.injector.get<DshButtonToggleGroupDirective>(
                DshButtonToggleGroupDirective
            );
            groupNgModel = groupDebugElement.injector.get<NgModel>(NgModel);

            buttonToggleDebugElements = fixture.debugElement.queryAll(By.directive(DshButtonToggleComponent));
            buttonToggleInstances = buttonToggleDebugElements.map(debugEl => debugEl.componentInstance);
            innerButtons = buttonToggleDebugElements.map(debugEl => debugEl.query(By.css('button')).nativeElement);

            fixture.detectChanges();
        }));

        it('should update the model before firing change event', fakeAsync(() => {
            expect(testComponent.modelValue).toBeUndefined();
            expect(testComponent.lastEvent).toBeUndefined();

            innerButtons[0].click();
            fixture.detectChanges();

            tick();
            expect(testComponent.modelValue).toBe('red');
            expect(testComponent.lastEvent.value).toBe('red');
        }));

        it('should set individual radio names based on the group name', () => {
            expect(groupInstance.name).toBeTruthy();
            for (const buttonToggle of buttonToggleInstances) {
                expect(buttonToggle.name).toBe(groupInstance.name);
            }

            groupInstance.name = 'new name';
            for (const buttonToggle of buttonToggleInstances) {
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
        });

        it('should update the name of radio DOM elements if the name of the group changes', () => {
            expect(innerButtons.every(button => button.getAttribute('name') === groupInstance.name)).toBe(
                true,
                'Expected all buttons to have the initial name.'
            );

            fixture.componentInstance.groupName = 'changed-name';
            fixture.detectChanges();

            expect(groupInstance.name).toBe('changed-name');
            expect(innerButtons.every(button => button.getAttribute('name') === groupInstance.name)).toBe(
                true,
                'Expected all buttons to have the new name.'
            );
        });

        it('should check the corresponding button toggle on a group value change', () => {
            expect(groupInstance.value).toBeFalsy();
            for (const buttonToggle of buttonToggleInstances) {
                expect(buttonToggle.checked).toBeFalsy();
            }

            groupInstance.value = 'red';
            for (const buttonToggle of buttonToggleInstances) {
                expect(buttonToggle.checked).toBe(groupInstance.value === buttonToggle.value);
            }

            const selected = groupInstance.selected as DshButtonToggleComponent;

            expect(selected.value).toBe(groupInstance.value);
        });

        it('should have the correct FormControl state initially and after interaction', fakeAsync(() => {
            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(true);
            expect(groupNgModel.touched).toBe(false);

            buttonToggleInstances[1].checked = true;
            fixture.detectChanges();
            tick();

            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(true);
            expect(groupNgModel.touched).toBe(false);

            innerButtons[2].click();
            fixture.detectChanges();
            tick();

            expect(groupNgModel.valid).toBe(true);
            expect(groupNgModel.pristine).toBe(false);
            expect(groupNgModel.touched).toBe(true);
        }));

        it('should update the ngModel value when selecting a button toggle', fakeAsync(() => {
            innerButtons[1].click();
            fixture.detectChanges();

            tick();

            expect(testComponent.modelValue).toBe('green');
        }));

        it(
            'should maintain the selected value when swapping out the list of toggles with one ' +
                'that still contains the value',
            fakeAsync(() => {
                expect(buttonToggleInstances[0].checked).toBe(false);
                expect(fixture.componentInstance.modelValue).toBeFalsy();
                expect(groupInstance.value).toBeFalsy();

                groupInstance.value = 'red';
                fixture.detectChanges();

                expect(buttonToggleInstances[0].checked).toBe(true);
                expect(groupInstance.value).toBe('red');

                fixture.componentInstance.options = [...fixture.componentInstance.options];
                fixture.detectChanges();
                tick();
                fixture.detectChanges();

                buttonToggleDebugElements = fixture.debugElement.queryAll(By.directive(DshButtonToggleComponent));
                buttonToggleInstances = buttonToggleDebugElements.map(debugEl => debugEl.componentInstance);

                expect(buttonToggleInstances[0].checked).toBe(true);
                expect(groupInstance.value).toBe('red');
            })
        );
    });
});
