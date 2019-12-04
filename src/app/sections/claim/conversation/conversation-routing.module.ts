import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConversationComponent } from './conversation.component';

const conversationRoutes: Routes = [{ path: '', component: ConversationComponent }];

@NgModule({
    imports: [RouterModule.forChild(conversationRoutes)],
    exports: [RouterModule]
})
export class ConversationRoutingModule {}
