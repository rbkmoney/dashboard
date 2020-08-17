import { NativeDateAdapter } from '@angular/material/core';

export class DateAdapter extends NativeDateAdapter {
    getFirstDayOfWeek(): number {
        return 1;
    }
}
