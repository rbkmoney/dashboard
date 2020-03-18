import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { MessagesModule } from '../../../api';
import { PanelModule } from '../../../layout/panel';
import { CommentContainerComponent } from './comment-container.component';

@NgModule({
    imports: [CommonModule, PanelModule, FlexLayoutModule, TranslocoModule, MessagesModule],
    declarations: [CommentContainerComponent],
    exports: [CommentContainerComponent]
})
export class CommentContainerModule {}
