import { NgModule } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';

import vfs from './vfs';
import fonts from './fonts';
import { DocumentService } from './document.service';

pdfMake.vfs = vfs;
pdfMake.fonts = fonts;

@NgModule({
    imports: [],
    declarations: [],
    entryComponents: [],
    providers: [DocumentService]
})
export class DocumentModule {}
