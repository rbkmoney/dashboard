import { ChangeDetectionStrategy, Component, ContentChild, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { CreatedCaseDirective } from '@dsh/app/shared/components/shop-creation/created-existing-switch/directives/created-case.directive';
import { ExistingCaseDirective } from '@dsh/app/shared/components/shop-creation/created-existing-switch/directives/existing-case.directive';
import { ComponentChanges } from '@dsh/type-utils';
import { switchControl } from '@dsh/utils';

export enum Type {
    Created,
    Existing,
}

export type TypeUnion<C, E> = {
    type: Type;
    created?: C;
    existing?: E;
};

export function createTypeUnionDefaultForm<C, E>(): FormGroup<TypeUnion<C, E>> {
    return new FormGroup<TypeUnion<C, E>>({
        type: new FormControl<Type>(null),
        created: new FormControl<C>({ value: null, disabled: true }) as any,
        existing: new FormControl<E>({ value: null, disabled: true }) as any,
    });
}

@Component({
    selector: 'dsh-created-existing-switch',
    templateUrl: 'created-existing-switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatedExistingSwitchComponent<N, E> implements OnChanges {
    @Input() form: FormGroup<TypeUnion<N, E>>;
    type = Type;

    @ContentChild(CreatedCaseDirective) createdCase!: CreatedCaseDirective;
    @ContentChild(ExistingCaseDirective) existingCase!: ExistingCaseDirective;

    ngOnChanges({ form }: ComponentChanges<CreatedExistingSwitchComponent<N, E>>): void {
        if (form && form.currentValue) this.typeChanged(form.currentValue.value.type);
    }

    typeChanged(type: Type): void {
        switchControl(type, [
            [Type.Created, this.form.controls.created],
            [Type.Existing, this.form.controls.existing],
        ]);
    }
}
