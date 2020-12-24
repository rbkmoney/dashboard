import { InjectionToken } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export const LAYOUT_GAP = new InjectionToken<string>('layoutGap');

export const SEARCH_LIMIT = new InjectionToken<number>('searchLimit');
export const DEFAULT_SEARCH_LIMIT = 10;

export type DialogConfig = { small: MatDialogConfig; medium: MatDialogConfig; large: MatDialogConfig };
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('dialogConfig');
export const DEFAULT_DIALOG_CONFIG: DialogConfig = {
    small: {
        width: '360px',
        maxHeight: '90vh',
        disableClose: true,
    },
    medium: {
        width: '552px',
        maxHeight: '90vh',
        disableClose: true,
    },
    large: {
        width: '648px',
        maxHeight: '90vh',
        disableClose: true,
    },
};
