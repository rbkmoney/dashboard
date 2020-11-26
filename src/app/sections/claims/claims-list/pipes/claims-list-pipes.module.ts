import { NgModule } from '@angular/core';

import { ClaimStatusColorPipe } from './claim-status-color.pipe';

@NgModule({
    declarations: [ClaimStatusColorPipe],
    exports: [ClaimStatusColorPipe],
})
export class ClaimsListPipesModule {}
