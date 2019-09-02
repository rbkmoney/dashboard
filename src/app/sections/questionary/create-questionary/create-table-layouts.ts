import { TableLayoutFunctions } from 'pdfmake/build/pdfmake';

export function createTableLayouts(): { [name: string]: TableLayoutFunctions } {
    return {
        header: {
            fillColor(idx) {
                return idx === 0 ? '#203764' : undefined;
            },
            hLineWidth() {
                return 0;
            },
            vLineWidth() {
                return 0;
            }
        }
    };
}
