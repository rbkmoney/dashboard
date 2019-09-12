import {
    Content as PDFMakeContent,
    Style,
    Table as PDFMakeTable,
    TableCell as PDFMakeTableCell
} from 'pdfmake/build/pdfmake';

import { Replace } from '../../type-utils';

export type Content = Replace<PDFMakeContent, { style?: Style | string | string[] }>;
export type TableCell = PDFMakeTableCell;
export type Table = Replace<PDFMakeTable, { body: (Content | PDFMakeTableCell | string)[][] }>;
