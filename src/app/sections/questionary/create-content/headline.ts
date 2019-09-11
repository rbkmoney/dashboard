import { Content, cmMarginsToIn } from '../../../document';

export function headline(text: string): Content {
    return {
        text,
        style: {
            alignment: 'center',
            bold: true
        },
        margin: cmMarginsToIn(0, 0.1, 0, 0.1)
    };
}
