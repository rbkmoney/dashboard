import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ColoredIconModule } from '@dsh/components/indicators';

import { MobileNavigationComponent } from './mobile-navigation.component';

@NgModule({
    imports: [CommonModule, CdkTreeModule, MatIconModule, RouterModule, TranslocoModule, FlexModule, ColoredIconModule],
    declarations: [MobileNavigationComponent],
    exports: [MobileNavigationComponent],
})
export class MobileNavigationModule {}
