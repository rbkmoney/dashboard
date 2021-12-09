import { Injectable } from '@angular/core';

@Injectable()
export class PaymentInstitutionConfigService {
    residentPaymentInstitution: number;
    nonResidentPaymentInstitution: number;

    init(residentPaymentInstitution: number, nonResidentPaymentInstitution: number): void {
        this.residentPaymentInstitution = residentPaymentInstitution;
        this.nonResidentPaymentInstitution = nonResidentPaymentInstitution;
    }
}
