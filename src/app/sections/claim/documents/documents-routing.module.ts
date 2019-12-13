import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent } from './documents.component';

const documentsRoutes: Routes = [{ path: '', component: DocumentsComponent }];

@NgModule({
    imports: [RouterModule.forChild(documentsRoutes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule {}
