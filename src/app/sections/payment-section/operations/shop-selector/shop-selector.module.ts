import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { ShopSelectorComponent } from './shop-selector.component';

@NgModule({
    declarations: [ShopSelectorComponent],
    imports: [
        FlexModule,
        ButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        CommonModule,
        TranslocoModule
    ],
    exports: [ShopSelectorComponent]
})
export class ShopSelectorModule {}
