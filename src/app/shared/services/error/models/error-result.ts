import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { CommonError } from '@dsh/app/shared';

export interface ErrorResult {
    error: CommonError;
    notification?: MatSnackBarRef<SimpleSnackBar>;
}
