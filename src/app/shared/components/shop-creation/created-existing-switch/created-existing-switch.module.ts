import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { CreatedExistingSwitchComponent } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { CreatedCaseDirective } from '@dsh/app/shared/components/shop-creation/created-existing-switch/directives/created-case.directive';
import { ExistingCaseDirective } from '@dsh/app/shared/components/shop-creation/created-existing-switch/directives/existing-case.directive';

@NgModule({
    imports: [CommonModule, TranslocoModule, FlexLayoutModule, ReactiveFormsModule, MatRadioModule],
    declarations: [CreatedCaseDirective, ExistingCaseDirective, CreatedExistingSwitchComponent],
    exports: [CreatedCaseDirective, ExistingCaseDirective, CreatedExistingSwitchComponent],
})
export class CreatedExistingSwitchModule {}
