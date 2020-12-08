import { NgModule } from '@angular/core';

import { UserService } from './user.service';

const EXPORTED_DECLARATIONS = [];

@NgModule({
    imports: [],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [UserService],
})
export class UserModule {}
