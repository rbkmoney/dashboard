import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'dsh-currency-filter',
    templateUrl: 'currency-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFilterComponent {
    @Input() currencies: string[];
    @Input() selected?: string;
    @Output() selectedChange = new EventEmitter<string>();

    constructor(private transloco: TranslocoService) {}

    formatCurrencyLabel = (currency: string): string =>
        `${this.transloco.translate('label', null, 'currency-filter')} · ${getCurrencySymbol(currency, 'narrow')}`;
}
