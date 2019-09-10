export enum YesNo {
    yes,
    no
}

export function toYesNo(value: any): YesNo {
    return value ? YesNo.yes : YesNo.no;
}
