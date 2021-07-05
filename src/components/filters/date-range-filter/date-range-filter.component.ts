import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { DateRange as MatDateRange } from '@angular/material/datepicker';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { provideValueAccessor } from '@s-libs/ng-core';
import { Moment } from 'moment';
import { merge } from 'rxjs';
import { map, publishReplay, refCount, switchMap } from 'rxjs/operators';

import { FilterSuperclass } from '@dsh/components/filter';
import { DateRange } from '@dsh/components/filters/date-range-filter/types/date-range';
import { createDateRangeByPreset } from '@dsh/components/filters/date-range-filter/utils/create-date-range-by-preset';

import { DateRangeLocalizationService } from './services/date-range-localization/date-range-localization.service';
import { Preset } from './types/preset';
import { PRESETS_TRANSLATION_PATH } from './types/preset-translation-path';
import { Step } from './types/step';
import { getPresetByDateRange } from './utils/get-preset-by-date-range';

type MatMomentDateRange = MatDateRange<Moment>;

@UntilDestroy()
@Component({
    selector: 'dsh-date-range-filter',
    templateUrl: 'date-range-filter.component.html',
    styleUrls: ['date-range-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(DateRangeFilterComponent), DateRangeLocalizationService],
})
export class DateRangeFilterComponent extends FilterSuperclass<MatMomentDateRange, DateRange> {
    @Input() default: DateRange = { start: null, end: null };
    @Input() maxDate: Moment;

    step = Step.Presets;
    presets = PRESETS_TRANSLATION_PATH;
    activeLabel$ = this.savedValue$.pipe(
        switchMap((dateRange) => {
            const preset = getPresetByDateRange(dateRange);
            return preset === Preset.Custom
                ? this.dateRangeLocalizationService.getLocalizedString(dateRange)
                : this.transloco.selectTranslate(
                      `presets.${PRESETS_TRANSLATION_PATH.find(([id]) => id === preset)[1]}`,
                      null,
                      'date-range-filter'
                  );
        })
    );
    selectedPreset$ = merge(this.formControl.valueChanges, this.savedValue$).pipe(
        map((v) => getPresetByDateRange(v || this.empty)),
        publishReplay(1),
        refCount()
    );
    stepEnum = Step;

    protected get empty(): MatMomentDateRange {
        return new MatDateRange(null, null);
    }

    constructor(
        injector: Injector,
        private dateRangeLocalizationService: DateRangeLocalizationService,
        private transloco: TranslocoService
    ) {
        super(injector);
    }

    selectedChange(date: Moment): void {
        const { start, end } = this.value;
        this.value =
            start === null || end !== null
                ? new MatDateRange(date, null)
                : start.isBefore(date)
                ? new MatDateRange(start.startOf('d'), date.endOf('d'))
                : new MatDateRange(date, start.endOf('d'));
    }

    selectPreset(preset: Preset): void {
        if (preset === Preset.Custom) {
            this.step = Step.Calendar;
            return;
        }
        const { start, end } = createDateRangeByPreset(preset);
        this.value = new MatDateRange(start, end);
    }

    save(value = this.formControl.value): void {
        super.save(value);
        this.step = Step.Presets;
    }

    clear(): void {
        this.formControl.setValue(this.outerToInner(this.default));
    }

    protected innerToOuter({ start, end }: MatMomentDateRange): DateRange {
        return { start, end };
    }

    protected outerToInner(dateRange: DateRange): MatMomentDateRange {
        if (!dateRange) return this.empty;
        const { start, end } = dateRange;
        return new MatDateRange(start, end);
    }
}
