import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { BANK_TOKEN_PROVIDERS } from './consts';
import { TokenProviderFilterValue } from './types/token-provider-filter-value';

@Component({
    selector: 'dsh-token-provider-filter',
    templateUrl: './token-provider-filter.component.html',
    styleUrls: ['./token-provider-filter.component.scss'],
})
export class TokenProviderFilterComponent implements OnInit {
    @Input() control: FormControl<TokenProviderFilterValue>;

    providers: TokenProviderFilterValue[] = BANK_TOKEN_PROVIDERS.slice();

    constructor() {}

    ngOnInit(): void {}
}
