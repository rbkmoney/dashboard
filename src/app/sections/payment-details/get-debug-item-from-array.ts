import { DebugElement } from '@angular/core';

export const getDebugItemFromArray = (array: DebugElement[], itemTitle: string): DebugElement =>
    array.filter(item => item.nativeElement.innerHTML.indexOf(itemTitle) >= 0)[0];
