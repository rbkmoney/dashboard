import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';

import { ExpansionComponent } from './expansion.component';
import { ItemComponent } from './item/item.component';
import { HeaderComponent } from './item/header/header.component';
import { ButtonModule } from '../button';
import { ContentComponent } from './item/content/content.component';

const EXPORTED_DECLARATIONS = [ExpansionComponent, ItemComponent, HeaderComponent, ContentComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, ButtonModule, MatIconModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class ExpansionModule {}
