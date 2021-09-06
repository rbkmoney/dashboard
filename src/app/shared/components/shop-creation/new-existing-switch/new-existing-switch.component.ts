import { ChangeDetectionStrategy, Component, ContentChild, Injector } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { ExistingCaseDirective } from '@dsh/app/shared/components/shop-creation/new-existing-switch/directives/existing-case.directive';
import { NewCaseDirective } from '@dsh/app/shared/components/shop-creation/new-existing-switch/directives/new-case.directive';
import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

export enum Type {
    New,
    Existing,
}

@Component({
    selector: 'dsh-new-existing-switch',
    templateUrl: 'new-existing-switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(NewExistingSwitchComponent),
})
export class NewExistingSwitchComponent extends ValidatedWrappedAbstractControlSuperclass<Type> {
    formControl = new FormControl<Type>();
    type = Type;

    @ContentChild(NewCaseDirective) newCase!: NewCaseDirective;
    @ContentChild(ExistingCaseDirective) existingCase!: ExistingCaseDirective;

    constructor(injector: Injector) {
        super(injector);
    }
}
