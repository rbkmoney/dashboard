import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DshButtonToggleChange, DshButtonToggleComponent, DshButtonToggleGroupDirective } from './button-toggle';
import { FormControl } from '@angular/forms';

@Component({
    template: `
        <dsh-button-toggle-group [disabled]="isGroupDisabled" [vertical]="isVertical" [(value)]="groupValue">
            <dsh-button-toggle value="test1" *ngIf="renderFirstToggle">Test1</dsh-button-toggle>
            <dsh-button-toggle value="test2">Test2</dsh-button-toggle>
            <dsh-button-toggle value="test3">Test3</dsh-button-toggle>
        </dsh-button-toggle-group>
    `
})
export class ButtonTogglesInsideButtonToggleGroupComponent {
    isGroupDisabled = false;
    isVertical = false;
    groupValue: string;
    renderFirstToggle = true;
}

@Component({
    template: `
        <dsh-button-toggle-group [name]="groupName" [(ngModel)]="modelValue" (change)="lastEvent = $event">
            <dsh-button-toggle *ngFor="let option of options" [value]="option.value">
                {{ option.label }}
            </dsh-button-toggle>
        </dsh-button-toggle-group>
    `
})
export class ButtonToggleGroupWithNgModelComponent {
    groupName = 'group-name';
    modelValue: string;
    options = [{ label: 'Red', value: 'red' }, { label: 'Green', value: 'green' }, { label: 'Blue', value: 'blue' }];
    lastEvent: DshButtonToggleChange;
}

@Component({
    template: `
        <dsh-button-toggle-group [disabled]="isGroupDisabled" [vertical]="isVertical" multiple>
            <dsh-button-toggle value="eggs">Eggs</dsh-button-toggle>
            <dsh-button-toggle value="flour">Flour</dsh-button-toggle>
            <dsh-button-toggle value="sugar">Sugar</dsh-button-toggle>
        </dsh-button-toggle-group>
    `
})
export class ButtonTogglesInsideButtonToggleGroupMultipleComponent {
    isGroupDisabled = false;
    isVertical = false;
}

@Component({
    template: `
        <dsh-button-toggle-group multiple [value]="value">
            <dsh-button-toggle [value]="0">Eggs</dsh-button-toggle>
            <dsh-button-toggle [value]="null">Flour</dsh-button-toggle>
            <dsh-button-toggle [value]="false">Sugar</dsh-button-toggle>
            <dsh-button-toggle>Sugar</dsh-button-toggle>
        </dsh-button-toggle-group>
    `
})
export class FalsyButtonTogglesInsideButtonToggleGroupMultipleComponent {
    value: ('' | number | null | undefined | boolean)[] = [0];
    @ViewChildren(DshButtonToggleComponent) toggles: QueryList<DshButtonToggleComponent>;
}

@Component({
    template: `
        <dsh-button-toggle>Yes</dsh-button-toggle>
    `
})
export class StandaloneButtonToggleComponent {}

@Component({
    template: `
        <dsh-button-toggle-group (change)="lastEvent = $event" value="red">
            <dsh-button-toggle value="red">Value Red</dsh-button-toggle>
            <dsh-button-toggle value="green">Value Green</dsh-button-toggle>
        </dsh-button-toggle-group>
    `
})
export class ButtonToggleGroupWithInitialValueComponent {
    lastEvent: DshButtonToggleChange;
}

@Component({
    template: `
        <dsh-button-toggle-group [formControl]="control">
            <dsh-button-toggle value="red">Value Red</dsh-button-toggle>
            <dsh-button-toggle value="green">Value Green</dsh-button-toggle>
            <dsh-button-toggle value="blue">Value Blue</dsh-button-toggle>
        </dsh-button-toggle-group>
    `
})
export class ButtonToggleGroupWithFormControlComponent {
    control = new FormControl();
}

/** Simple test component with an aria-label set. */
@Component({
    template: `
        <dsh-button-toggle aria-label="Super effective"></dsh-button-toggle>
    `
})
export class ButtonToggleWithAriaLabelComponent {}

/** Simple test component with an aria-label set. */
@Component({
    template: `
        <dsh-button-toggle aria-labelledby="some-id"></dsh-button-toggle>
    `
})
export class ButtonToggleWithAriaLabelledbyComponent {}

@Component({
    template: `
        <dsh-button-toggle-group [(value)]="value">
            <dsh-button-toggle *ngFor="let toggle of possibleValues" [value]="toggle">
                {{ toggle }}
            </dsh-button-toggle>
        </dsh-button-toggle-group>
    `
})
export class RepeatedButtonTogglesWithPreselectedValueComponent {
    @ViewChild(DshButtonToggleGroupDirective) toggleGroup: DshButtonToggleGroupDirective;
    @ViewChildren(DshButtonToggleComponent) toggles: QueryList<DshButtonToggleComponent>;

    possibleValues = ['One', 'Two', 'Three'];
    value = 'Two';
}

@Component({
    template: `
        <dsh-button-toggle tabindex="3"></dsh-button-toggle>
    `
})
export class ButtonToggleWithTabindexComponent {}

@Component({
    template: `
        <dsh-button-toggle name="custom-name"></dsh-button-toggle>
    `
})
export class ButtonToggleWithStaticNameComponent {}
