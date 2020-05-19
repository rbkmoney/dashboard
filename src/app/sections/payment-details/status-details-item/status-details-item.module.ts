import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';

import { StatusDetailsItemComponent } from './status-details-item.component';

@NgModule({
    imports: [DetailsItemModule, StatusModule, CommonModule, TranslocoModule],
    declarations: [StatusDetailsItemComponent],
    exports: [StatusDetailsItemComponent],
})
export class StatusDetailsItemModule {}
