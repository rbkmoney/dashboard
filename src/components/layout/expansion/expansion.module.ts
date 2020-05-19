import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { ButtonModule } from '@dsh/components/buttons';

import { ExpansionComponent } from './expansion.component';
import { ContentComponent } from './item/content/content.component';
import { HeaderComponent } from './item/header/header.component';
import { ItemComponent } from './item/item.component';

const EXPORTED_DECLARATIONS = [ExpansionComponent, ItemComponent, HeaderComponent, ContentComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, ButtonModule, MatIconModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class ExpansionModule {}
