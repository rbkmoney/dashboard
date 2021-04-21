import { NgModule } from '@angular/core';

import { AggrProxyModule } from './aggr-proxy';
import { AnapiModule } from './anapi';
import { CapiModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { DarkApiModule } from './dark-api';
import { MessagesModule } from './messages';
import { OrganizationsModule } from './organizations';
import { QuestionaryModule } from './questionary';

// TODO: delete? there are intersections of services
@NgModule({
    imports: [
        CapiModule,
        ClaimManagementModule,
        QuestionaryModule,
        AnapiModule,
        AggrProxyModule,
        DarkApiModule,
        MessagesModule,
        OrganizationsModule,
    ],
})
export class ApiCodegenModule {}
