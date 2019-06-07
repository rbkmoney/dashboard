import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardContentDirective, CardTitleDirective, CardActionsDirective } from './directives';

@NgModule({
    imports: [CommonModule],
    declarations: [CardComponent, CardContentDirective, CardTitleDirective, CardHeaderComponent, CardActionsDirective],
    exports: [CardComponent, CardContentDirective, CardTitleDirective, CardHeaderComponent, CardActionsDirective]
})
export class CardModule {}
