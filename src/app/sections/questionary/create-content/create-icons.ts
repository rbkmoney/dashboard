import { FontFamily, Content } from '../../../document';

export function createIcons<T extends { [name: string]: string }>(iconsObj: T): Record<keyof T, Content> {
    return Object.entries(iconsObj).reduce(
        (acc, [name, text]) => {
            acc[name] = {
                text,
                style: {
                    font: FontFamily.fa
                }
            };
            return acc;
        },
        {} as any
    );
}
