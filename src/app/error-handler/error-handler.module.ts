import { ErrorHandler, NgModule } from '@angular/core';

import { ErrorHandlerService } from './error-handler.service';

const EXPORTED_DECLARATIONS = [];

@NgModule({
    imports: [],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [{ provide: ErrorHandler, useClass: ErrorHandlerService }],
})
export class ErrorHandlerModule {}
