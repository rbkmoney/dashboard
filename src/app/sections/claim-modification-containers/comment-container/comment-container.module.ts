import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { PanelModule } from '../../../layout/panel';
import { CommentContainerComponent } from './comment-container.component';
import { MessagesModule } from '../../../api';

@NgModule({
    imports: [CommonModule, PanelModule, FlexLayoutModule, TranslocoModule, MessagesModule],
    declarations: [CommentContainerComponent],
    exports: [CommentContainerComponent]
})
export class CommentContainerModule {}
