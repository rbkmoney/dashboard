import {
    Content as PDFMakeContent,
    Style,
    Table as PDFMakeTable,
    TableCell as PDFMakeTableCell
} from 'pdfmake/build/pdfmake';

import { Replace } from '../../type-utils';

export type Content = string | Replace<PDFMakeContent, { style?: Style | string | string[] }>;
export type TableCell = Content | PDFMakeTableCell;
export type Table = Replace<PDFMakeTable, { body: TableCell[][] }>;
