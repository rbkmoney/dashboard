import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { NoContentModule } from '@dsh/app/shared/directives';
import { ButtonModule } from '@dsh/components/buttons';

import { BaseDialogComponent } from './base-dialog.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, ButtonModule, NoContentModule, TranslocoModule],
    declarations: [BaseDialogComponent],
    exports: [BaseDialogComponent],
})
export class BaseDialogModule {}
