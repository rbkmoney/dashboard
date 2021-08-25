import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { WalletAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/wallet-autocomplete-field';
import { ButtonModule } from '@dsh/components/buttons';
import { RangeDatepickerModule } from '@dsh/components/form-controls';
import { FloatPanelModule, JustifyWrapperModule } from '@dsh/components/layout';

import { SearchFormComponent } from './search-form.component';
import { SearchFormService } from './search-form.service';

@NgModule({
    imports: [
        FloatPanelModule,
        TranslocoModule,
        ReactiveFormsModule,
        JustifyWrapperModule,
        RangeDatepickerModule,
        MatFormFieldModule,
        FlexModule,
        MatSelectModule,
        ButtonModule,
        WalletAutocompleteFieldModule,
        MatInputModule,
        CommonModule,
    ],
    declarations: [SearchFormComponent],
    exports: [SearchFormComponent],
    providers: [SearchFormService],
})
export class SearchFormModule {}
