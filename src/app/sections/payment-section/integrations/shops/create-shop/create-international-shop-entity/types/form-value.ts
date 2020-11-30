interface InternationalBankAccountFormValue {
    number: string;
    iban: string;
    abaRtn: string;
    address: string;
    bic: string;
    name: string;
    country: string;
}

interface InternationalCorrespondentAccountFormValue extends InternationalBankAccountFormValue {
    accountHolder: string;
    iban: string;
    number: string;
}

export interface FormValue {
    shopUrl: string;
    shopName: string;
    organizationName: string;
    tradingName: string;
    registeredAddress: string;
    actualAddress: string;
    payoutTool: InternationalBankAccountFormValue;
    correspondentPayoutTool: InternationalCorrespondentAccountFormValue;
}
