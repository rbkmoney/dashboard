import { NgModule } from '@angular/core';

import { phoneNumberInput } from './phone-number-input';

const EXPORTED_DECLARATIONS = [phoneNumberInput].map(({ InputModule }) => InputModule);

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class ContactControlsModule {}
