import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';
import { LocaleModule } from '../../locale';
import { DshTabsModule } from '../../layout/tabs';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ChangesComponent } from './changes';
import { DocumentsComponent } from './documents';
import { ClaimsModule } from '../../claims';
import { ConversationModule } from './conversation';
import { StatusModule } from '../../status';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        DshTabsModule,
        ButtonModule,
        FlexLayoutModule,
        LocaleModule,
        ClaimsModule,
        ClaimRoutingModule,
        ConversationModule,
        StatusModule
    ],
    declarations: [ClaimComponent, ChangesComponent, DocumentsComponent]
})
export class ClaimModule {}
