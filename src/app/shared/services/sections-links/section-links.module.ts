import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { SectionsLinksService } from './section-links.service';

@NgModule({
    imports: [TranslocoModule],
    providers: [SectionsLinksService],
})
export class SectionsLinksModule {}
