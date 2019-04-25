import { NgModule } from '@angular/core';

import { DocumentService } from './document.service';
import { DocumentFontsService } from './font/document-fonts.service';

@NgModule({
    imports: [],
    declarations: [],
    entryComponents: [],
    providers: [DocumentService, DocumentFontsService]
})
export class DocumentModule {}
