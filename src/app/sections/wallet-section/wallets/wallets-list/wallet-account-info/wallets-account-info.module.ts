import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared';
import { DetailsItemModule } from '@dsh/components/layout';

import { WalletsAccountInfoComponent } from './wallets-account-info.component';

@NgModule({
    imports: [CommonModule, FlexModule, DetailsItemModule, TranslocoModule, GridModule, ToMajorModule],
    declarations: [WalletsAccountInfoComponent],
    exports: [WalletsAccountInfoComponent],
})
export class WalletsAccountInfoModule {}
