import { AbstractControl } from '@angular/forms';

export function switchControl<T extends PropertyKey>(type: T, controls: { [N in T]: AbstractControl }): void {
    for (const [controlType, control] of Object.entries(controls) as [T, AbstractControl][]) {
        if (type === controlType) control.enable();
        else control.disable();
    }
}
