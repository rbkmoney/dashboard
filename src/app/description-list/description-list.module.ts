import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DescriptionListComponent } from './description-list.component';
import { ListItemComponent } from './list-item/list-item.component';

const EXPORTED_DECLARATIONS = [DescriptionListComponent, ListItemComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class DescriptionListModule {}
