import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { provideValueAccessor } from '@s-libs/ng-core';

import { FilterSuperclass } from '@dsh/components/filter';
import { binValidator, lastDigitsValidator } from '@dsh/components/form-controls';

import { CardBinPan } from './types/card-bin-pan';

@UntilDestroy()
@Component({
    selector: 'dsh-card-bin-pan-filter',
    templateUrl: './card-bin-pan-filter.component.html',
    styleUrls: ['./card-bin-pan-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(CardBinPanFilterComponent)],
})
export class CardBinPanFilterComponent extends FilterSuperclass<CardBinPan> {
    formControl: FormGroup<CardBinPan> = this.fb.group({
        bin: ['', binValidator],
        pan: ['', lastDigitsValidator],
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    createEmpty(): CardBinPan {
        return { bin: '', pan: '' };
    }

    save(): void {
        const { bin, pan } = this.formControl.controls;
        this.formControl.patchValue({
            bin: bin.valid ? bin.value : '',
            pan: pan.valid ? pan.value : '',
        });
        this.savedValue = this.formControl.value;
    }
}
