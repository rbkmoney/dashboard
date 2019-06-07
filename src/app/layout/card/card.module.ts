import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CardComponent,
    CardContentComponent,
    CardTitleDirective,
    CardHeaderComponent,
    CardActionsComponent
} from './card.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CardComponent, CardContentComponent, CardTitleDirective, CardHeaderComponent, CardActionsComponent],
    exports: [CardComponent, CardContentComponent, CardTitleDirective, CardHeaderComponent, CardActionsComponent]
})
export class CardModule {}
