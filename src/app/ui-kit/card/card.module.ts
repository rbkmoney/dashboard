import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardTitleComponent } from './card-header/card-title/card-title.component';

@NgModule({
    declarations: [CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent],
    imports: [CommonModule],
    exports: [CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent],
    providers: []
})
export class CardModule {}
