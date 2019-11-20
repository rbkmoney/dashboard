import { NgModule } from '@angular/core';

import { individualEntityInnInput } from './individual-entity-inn';
import { issuerCodeInput } from './issuer-code-mask';
import { seriesNumberInput } from './series-number';
import { snilsInput } from './snils';

const EXPORTED_DECLARATIONS = [individualEntityInnInput, issuerCodeInput, seriesNumberInput, snilsInput].map(
    ({ InputModule }) => InputModule
);

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class IndividualEntityControlsModule {}
