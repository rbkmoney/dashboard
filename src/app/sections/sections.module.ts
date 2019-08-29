import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { SectionsComponent } from './sections.component';
import { LAYOUT_GAP } from './constants';
import { ShopModule } from '../api/shop';

@NgModule({
    imports: [MainModule, SectionsRoutingModule, ShopModule],
    declarations: [SectionsComponent],
    exports: [SectionsComponent],
    providers: [{ provide: LAYOUT_GAP, useValue: '20px' }]
})
export class SectionsModule {}
