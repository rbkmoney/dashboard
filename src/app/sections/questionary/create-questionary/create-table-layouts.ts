import { TableLayoutFunctions } from 'pdfmake/build/pdfmake';

const COLOR_DEEP_BLUE = '#203764';

export enum Layout {
    noBorders = 'noBorders',
    header = 'header'
}

const noBorders: TableLayoutFunctions = {
    hLineWidth() {
        return 0;
    },
    vLineWidth() {
        return 0;
    }
};

export function createTableLayouts(): { [name in Layout]: TableLayoutFunctions } {
    return {
        [Layout.noBorders]: noBorders,
        [Layout.header]: {
            fillColor(rowIdx) {
                return rowIdx === 0 ? COLOR_DEEP_BLUE : null;
            },
            ...noBorders
        }
    };
}
