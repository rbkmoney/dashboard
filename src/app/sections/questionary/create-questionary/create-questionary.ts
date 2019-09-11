import moment from 'moment';
import { TableLayoutFunctions, TDocumentDefinitions, PageSize } from 'pdfmake/build/pdfmake';

import { createStyles, createDefaultStyle } from './create-styles';
import { createTableLayouts } from './create-table-layouts';
import { Data } from './data';
import { cmMarginsToIn } from '../../../document/cm-margins-to-in';
import { createFooter } from './create-footer';

export function createQuestionary(data: Data): [TDocumentDefinitions, { [name: string]: TableLayoutFunctions }] {
    const leftMarginCm = 3;
    const topMarginCm = 2;
    const rightMarginCm = 1.5;
    const footerMarginCm = 2;

    const pageMarginsIn = cmMarginsToIn(leftMarginCm, topMarginCm, rightMarginCm, footerMarginCm + data.footerHeight);
    const footerMarginsIn = cmMarginsToIn(leftMarginCm, 0, rightMarginCm, 0);

    return [
        {
            pageSize: 'A4' as PageSize,
            pageMargins: pageMarginsIn,
            content: [
                ...data.content,
                {
                    layout: 'noBorders',
                    margin: cmMarginsToIn(0, 1.1, 0, 0),
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            [
                                'М.П.' as any,
                                {
                                    text: moment().format('LL') + '\n\n\n_____________________/______________/',
                                    style: { alignment: 'right' }
                                }
                            ]
                        ]
                    }
                }
                // debug footer margins
                // ...new Array(100).fill(null).map((_, idx) => `${idx}. debug line`)
            ],
            footer: createFooter({ margin: footerMarginsIn, text: data.footer }),
            styles: createStyles(),
            defaultStyle: createDefaultStyle()
        },
        createTableLayouts()
    ];
}
