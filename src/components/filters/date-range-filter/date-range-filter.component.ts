import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { DateRange as MatDateRange } from '@angular/material/datepicker';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { provideValueAccessor } from '@s-libs/ng-core';
import moment, { Moment } from 'moment';
import { merge } from 'rxjs';
import { map, publishReplay, refCount, switchMap } from 'rxjs/operators';

import { FilterSuperclass } from '@dsh/components/filter';
import { DateRange } from '@dsh/components/filters/date-range-filter/types/date-range';

import { DateRangeLocalizationService } from './services/date-range-localization/date-range-localization.service';
import { Preset } from './types/preset';

enum Step {
    Presets,
    Calendar,
}

type MatMomentDateRange = MatDateRange<Moment>;

const PRESETS_TRANSLATION_PATH: [id: Preset, translationPath: string][] = [
    [Preset.Last24hour, 'last24hour'],
    [Preset.Last30days, 'last30days'],
    [Preset.Last90days, 'last90days'],
    [Preset.Last365days, 'last365days'],
    [Preset.Custom, 'custom'],
];

function createDateRangeByPreset(preset: Preset): DateRange {
    let start: Moment = moment();
    switch (preset) {
        case Preset.Last24hour:
            start = start.subtract(1, 'd');
            break;
        case Preset.Last30days:
            start = start.subtract(30, 'd');
            break;
        case Preset.Last90days:
            start = start.subtract(90, 'd');
            break;
        case Preset.Last365days:
            start = start.subtract(365, 'd');
            break;
    }
    return { start, end: moment().endOf('d') };
}

function getPresetByDateRange({ start, end }: DateRange): Preset {
    if (start && end && end.local().isSame(moment(), 'd')) {
        if (moment().diff(start.local(), 'h') === 24) return Preset.Last24hour;
        if (moment().diff(start.local(), 'd') === 30) return Preset.Last30days;
        if (moment().diff(start.local(), 'd') === 90) return Preset.Last90days;
        if (moment().diff(start.local(), 'd') === 365) return Preset.Last365days;
    }
    return Preset.Custom;
}

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
                ? new MatDateRange(start, date)
                : new MatDateRange(date, start);
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
