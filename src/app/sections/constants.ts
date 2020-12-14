import { InjectionToken } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export const LAYOUT_GAP = new InjectionToken<string>('layoutGap');

export const DEFAULT_SEARCH_LIMIT = 20;
export const SEARCH_LIMIT = new InjectionToken<number>('searchLimit');

export type DialogConfig = { small: MatDialogConfig; medium: MatDialogConfig; large: MatDialogConfig };
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('dialogConfig');
