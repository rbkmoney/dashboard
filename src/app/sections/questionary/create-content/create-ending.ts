import moment from 'moment';

import { cmMarginsToIn } from '../../../document';

export function createEnding() {
    return {
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
    };
}
