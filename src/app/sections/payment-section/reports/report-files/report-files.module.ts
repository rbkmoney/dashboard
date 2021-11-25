import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { ReportFileComponent } from './report-file';
import { ReportFilesComponent } from './report-files.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, ButtonModule, MatSnackBarModule, BootstrapIconModule],
    declarations: [ReportFilesComponent, ReportFileComponent],
    exports: [ReportFilesComponent],
})
export class ReportFilesModule {}
