import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './list.component';

const EXPORTED_DECLARATIONS = [ListComponent, ListItemComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [],
})
export class ListModule {}
