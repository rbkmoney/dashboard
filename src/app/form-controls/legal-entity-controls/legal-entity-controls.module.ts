import { NgModule } from '@angular/core';

import { legalEntityInnInput } from './legal-entity-inn';

const EXPORTED_DECLARATIONS = [legalEntityInnInput].map(({ InputModule }) => InputModule);

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class LegalEntityControlsModule {}
