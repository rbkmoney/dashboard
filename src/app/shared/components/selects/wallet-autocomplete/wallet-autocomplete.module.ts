import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { AutocompleteVirtualScrollModule } from '@dsh/app/shared';

import { WalletAutocompleteComponent } from './wallet-autocomplete.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        AutocompleteVirtualScrollModule,
    ],
    declarations: [WalletAutocompleteComponent],
    exports: [WalletAutocompleteComponent],
})
export class WalletAutocompleteModule {}
