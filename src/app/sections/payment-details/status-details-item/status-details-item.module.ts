import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { StatusDetailsItemComponent } from './status-details-item.component';
import { DetailsItemModule } from '../../../details-item';
import { StatusModule } from '../../../status';

@NgModule({
    imports: [DetailsItemModule, StatusModule, CommonModule, TranslocoModule],
    declarations: [StatusDetailsItemComponent],
    exports: [StatusDetailsItemComponent]
})
export class StatusDetailsItemModule {}
