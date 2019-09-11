import { Content as MakePDFContent, Style } from 'pdfmake/build/pdfmake';

import { Replace } from '../../type-utils';

export type Content = Replace<MakePDFContent, { style?: Style | string | string[] }>;
