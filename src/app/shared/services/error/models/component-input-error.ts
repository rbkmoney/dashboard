import { Type } from '@angular/core';

import { CustomError } from '@dsh/app/shared/services/error/models/custom-error';

export class ComponentInputError extends CustomError {
    readonly classRef: Type<any>;

    constructor(message: string, classRef: Type<any>) {
        super(message);
        this.classRef = classRef;
    }
}
