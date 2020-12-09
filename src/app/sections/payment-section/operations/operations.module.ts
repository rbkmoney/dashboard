import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { SearchModule } from '@dsh/api/search';
import { LayoutModule } from '@dsh/components/layout';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';

@NgModule({
    imports: [CommonModule, OperationsRoutingModule, LayoutModule, FlexLayoutModule, SearchModule, TranslocoModule],
    declarations: [OperationsComponent],
})
export class OperationsModule {}
