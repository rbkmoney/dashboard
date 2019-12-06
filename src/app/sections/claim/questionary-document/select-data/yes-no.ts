export enum YesNo {
    yes,
    no
}

export function toYesNo(value: boolean): YesNo {
    return value ? YesNo.yes : YesNo.no;
}
