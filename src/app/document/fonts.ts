import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

import vfs from './vfs';

const fonts: { [name: string]: Partial<Record<keyof TFontFamilyTypes, keyof typeof vfs>> } = {
    serif: {
        normal: 'tinosRegular'
    }
};

export default fonts;
