import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
    name: 'payoutToolDetailsType',
})
export class PayoutToolDetailsTypePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(value: string): string {
        let path: string;
        switch (value) {
            case 'PayoutToolDetailsBankAccount':
                path = 'payoutToolDetailsBankAccount';
                break;
            case 'PayoutToolDetailsInternationalBankAccount':
                path = 'payoutToolDetailsInternationalBankAccount';
                break;
            case 'PayoutToolDetailsBankCard':
                path = 'payoutToolDetailsBankCard';
                break;
            case 'PayoutToolDetailsWalletInfo':
                path = 'payoutToolDetailsWalletInfo';
                break;
            case 'PayoutToolDetailsPaymentInstitutionAccount':
                path = 'payoutToolDetailsPaymentInstitutionAccount';
                break;
        }
        return path ? this.transloco.translate(`apiModelTypes.payoutToolDetailsType.${path}`) : path;
    }
}
