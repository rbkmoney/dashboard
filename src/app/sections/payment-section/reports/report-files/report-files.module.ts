import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { ReportFileComponent } from './report-file';
import { ReportFilesComponent } from './report-files.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, ButtonModule, MatIconModule, MatSnackBarModule],
    declarations: [ReportFilesComponent, ReportFileComponent],
    exports: [ReportFilesComponent],
})
export class ReportFilesModule {}
