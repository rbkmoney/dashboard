export interface WithdrawalSumFilter {
    // format input gets string and should return number but it's not always happening
    min: string | number;
    max: string | number;
}
