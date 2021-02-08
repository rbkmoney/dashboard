import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { NoContentModule } from '@dsh/app/shared/directives';
import { ButtonModule } from '@dsh/components/buttons';

import { BaseDialogComponent } from './base-dialog.component';
import { BaseDialogActionsDirective } from './directives/base-dialog-actions/base-dialog-actions.directive';
import { BaseDialogTitleDirective } from './directives/base-dialog-title/base-dialog-title.directive';

const SHARED_DECLARATIONS = [BaseDialogComponent, BaseDialogActionsDirective, BaseDialogTitleDirective];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, ButtonModule, NoContentModule, TranslocoModule, MatDividerModule],
    declarations: SHARED_DECLARATIONS,
    exports: SHARED_DECLARATIONS,
})
export class BaseDialogModule {}
