import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-currency-filter',
    templateUrl: 'currency-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFilterComponent {
    @Input() currencies: string[];
    @Input() selected?: string;
    @Output() selectedChange = new EventEmitter<string>();

    formatCurrencyLabel(currency: string): string {
        return getCurrencySymbol(currency, 'narrow');
    }
}
