import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CardComponent,
    CardContentComponent,
    CardTitleDirective,
    CardHeaderComponent,
    CardActionsComponent
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
