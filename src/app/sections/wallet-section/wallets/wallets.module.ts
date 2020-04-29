import { NgModule } from '@angular/core';

import { ReceiveWalletsService } from './receive-wallets.service';
import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './wallets.component';

@NgModule({
    imports: [WalletsRoutingModule],
    providers: [ReceiveWalletsService],
    declarations: [WalletsComponent]
})
export class WalletsModule {}
