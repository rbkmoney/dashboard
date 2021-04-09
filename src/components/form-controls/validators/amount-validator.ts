import { Validators } from '@angular/forms';

export const amountValidator = Validators.pattern(/^\d+([,.]\d{1,2})?$/);
