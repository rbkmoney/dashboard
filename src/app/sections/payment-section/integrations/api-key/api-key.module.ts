import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule } from '@dsh/components/layout';

import { ApiKeyRoutingModule } from './api-key-routing.module';
import { ApiKeyComponent } from './api-key.component';

@NgModule({
    imports: [
        ApiKeyRoutingModule,
        FlexModule,
        TranslocoModule,
        CardModule,
        MatInputModule,
        CommonModule,
        ButtonModule,
        ClipboardModule,
    ],
    declarations: [ApiKeyComponent],
})
export class ApiKeyModule {}
