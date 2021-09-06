import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { ExistingCaseDirective } from '@dsh/app/shared/components/shop-creation/new-existing-switch/directives/existing-case.directive';
import { NewCaseDirective } from '@dsh/app/shared/components/shop-creation/new-existing-switch/directives/new-case.directive';
import { NewExistingSwitchComponent } from '@dsh/app/shared/components/shop-creation/new-existing-switch/new-existing-switch.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FlexLayoutModule, ReactiveFormsModule, MatRadioModule],
    declarations: [NewCaseDirective, ExistingCaseDirective, NewExistingSwitchComponent],
    exports: [NewCaseDirective, ExistingCaseDirective, NewExistingSwitchComponent],
})
export class NewExistingSwitchModule {}
