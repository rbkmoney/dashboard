import { Style } from 'pdfmake/build/pdfmake';

import { FontFamily } from '../../../document';

export function createStyles(): { [name: string]: Style } {
    return {
        header: {
            alignment: 'center',
            bold: true
        },
        right: { alignment: 'right' },
        tableHeader: {
            color: 'white'
        },
        footer: {
            fontSize: 6
        },
        underline: {
            decoration: 'underline',
            decorationStyle: 'solid',
            decorationColor: 'black'
        },
        icon: {
            font: FontFamily.fa
        }
    };
}

export function createDefaultStyle(): Style {
    return {
        font: FontFamily.serif,
        fontSize: 8,
        lineHeight: 1
    };
}
