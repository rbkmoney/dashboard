import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    CardActionsComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleDirective
} from './card.component';

const EXPORTED_DECLARATIONS = [
    CardComponent,
    CardContentComponent,
    CardTitleDirective,
    CardHeaderComponent,
    CardActionsComponent
];

@NgModule({
    imports: [CommonModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class CardModule {}
