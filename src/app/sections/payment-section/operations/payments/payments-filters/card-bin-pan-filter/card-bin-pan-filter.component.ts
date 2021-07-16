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

    get empty(): CardBinPan {
        return { bin: '', pan: '' };
    }

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    save(): void {
        const { bin, pan } = this.formControl.controls;
        this.set({ bin: bin.valid ? bin.value : '', pan: pan.valid ? pan.value : '' });
    }

    protected isEmpty(value: CardBinPan): boolean {
        return super.isEmpty(value) || (!value.bin && !value.pan);
    }

    protected innerToOuter(inner: CardBinPan): CardBinPan {
        const result: CardBinPan = {};
        if (inner.bin) result.bin = inner.bin;
        if (inner.pan) result.pan = inner.pan;
        return result;
    }
}
