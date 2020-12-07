import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteVirtualScrollModule } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll';

@NgModule({
    imports: [CommonModule, AutocompleteVirtualScrollModule],
    exports: [AutocompleteVirtualScrollModule],
})
export class SelectsModule {}
