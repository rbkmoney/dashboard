import { NgModule } from '@angular/core';

import { BankCardControlsModule } from './bank-card-controls';
import { IndividualEntityControlsModule } from './individual-entity-controls';
import { LegalEntityControlsModule } from './legal-entity-controls';

const EXPORTED_DECLARATIONS = [BankCardControlsModule, IndividualEntityControlsModule, LegalEntityControlsModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class FormControlsModule {}
