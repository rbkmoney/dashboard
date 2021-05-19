import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged, map } from 'rxjs/operators';

@UntilDestroy()
@Component({
    selector: 'dsh-multi-input-field',
    templateUrl: 'multi-input-field.component.html',
    styleUrls: ['multi-input-field.component.scss'],
    providers: [provideValueAccessor(MultiInputFieldComponent)],
})
export class MultiInputFieldComponent extends FormControlSuperclass<string[]> implements OnInit {
    @Input() label: string;

    formControl = new FormArray<string>([new FormControl('')]);

    ngOnInit(): void {
        this.formControl.valueChanges
            .pipe(
                map((value) => value.filter(Boolean)),
                distinctUntilChanged(isEqual),
                untilDestroyed(this)
            )
            .subscribe((value) => this.emitOutgoingValue(value));
    }

    handleIncomingValue(value: string[]): void {
        this.formControl.clear();
        for (const v of value?.length ? value : ['']) {
            this.addControl(v);
        }
    }

    addControl(value?: string): void {
        this.formControl.push(new FormControl(value));
    }

    removeControl(idx: number): void {
        if (this.formControl.controls.length > 1) {
            this.formControl.removeAt(idx);
        } else {
            this.handleIncomingValue(['']);
        }
    }
}
