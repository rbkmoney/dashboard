import { Content } from 'pdfmake/build/pdfmake';

function createIcons<T extends { [name: string]: string }>(iconsObj: T): Record<keyof T, Content> {
    return Object.entries(iconsObj).reduce(
        (acc, [name, text]) => {
            acc[name] = { text, style: 'icon' };
            return acc;
        },
        {} as any
    );
}

export const icons = createIcons({
    checkSquare: '',
    square: ''
});
