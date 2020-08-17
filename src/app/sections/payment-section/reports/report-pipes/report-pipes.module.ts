import { NgModule } from '@angular/core';

import { ReportStatusColorPipe } from './report-status-color.pipe';
import { ReportStatusNamePipe } from './report-status-name.pipe';
import { ReportTypeNamePipe } from './report-type-name.pipe';

const EXPORTED_MODULES = [ReportStatusColorPipe, ReportStatusNamePipe, ReportTypeNamePipe];

@NgModule({
    declarations: [EXPORTED_MODULES],
    exports: [EXPORTED_MODULES],
})
export class ReportPipesModule {}
