import { NgModule } from '@angular/core';

import { lastDigitsInput } from './last-digits-input';
import { binInput } from './bin-input';

const EXPORTED_DECLARATIONS = [lastDigitsInput, binInput].map(({ InputModule }) => InputModule);

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class BankCardControlsModule {}
