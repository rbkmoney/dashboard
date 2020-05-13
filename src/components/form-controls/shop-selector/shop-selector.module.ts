import { NgModule } from '@angular/core';
import { ShopSelectorComponent } from '@dsh/components/form-controls/shop-selector/shop-selector.component';
import { FlexModule } from '@angular/flex-layout';
import { ButtonModule } from '@dsh/components/buttons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

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