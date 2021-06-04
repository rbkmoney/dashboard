import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ActionsModule } from '@dsh/app/shared/components/actions';
import { NoContentModule } from '@dsh/app/shared/directives';
import { ButtonModule } from '@dsh/components/buttons';

import { BaseDialogComponent } from './base-dialog.component';
import { BaseDialogActionsDirective } from './directives/base-dialog-actions/base-dialog-actions.directive';
import { BaseDialogTitleDirective } from './directives/base-dialog-title/base-dialog-title.directive';

const SHARED_DECLARATIONS = [BaseDialogComponent, BaseDialogActionsDirective, BaseDialogTitleDirective];

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ButtonModule,
        NoContentModule,
        TranslocoModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        ActionsModule,
    ],
    declarations: SHARED_DECLARATIONS,
    exports: SHARED_DECLARATIONS,
})
export class BaseDialogModule {}
