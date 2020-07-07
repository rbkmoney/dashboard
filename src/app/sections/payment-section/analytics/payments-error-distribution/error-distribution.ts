export interface ErrorDistribution {
    errorCode: string;
    percents: number;
    subErrors: ErrorDistribution[];
}
