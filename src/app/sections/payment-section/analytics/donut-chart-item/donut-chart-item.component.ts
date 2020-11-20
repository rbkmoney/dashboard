import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { DistributionChartData } from '../utils';

@Component({
    selector: 'dsh-donut-chart-item',
    templateUrl: 'donut-chart-item.component.html',
    styleUrls: ['donut-chart-item.component.scss'],
})
export class DonutChartItemComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;
    @Input() title: string;
    @Input() selectedErrorTitle: string;
    @Input() chartData: DistributionChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
    @Input() colors?: string[];
    @Output() dataSelect = new EventEmitter<number>();
    @Output() backDataSelect = new EventEmitter();

    ngOnChanges(changes: SimpleChanges) {
        if (changes.chartData?.currentValue) {
            this.error = undefined;
        }
    }

    updateDataSelection(value: number) {
        this.dataSelect.emit(value);
    }

    goBackDataSelection() {
        this.backDataSelect.emit();
    }
}
