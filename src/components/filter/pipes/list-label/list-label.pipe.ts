import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listLabel' })
export class ListLabelPipe implements PipeTransform {
    transform(label: string, list: (string | number)[], maxCount: number = 3, maxLength: number = Infinity): string {
        if (!list?.length) {
            return label;
        }
        if (list.length < maxCount) {
            const listStr = list.join(', ');
            if (listStr.length < maxLength) {
                return listStr;
            }
        }
        return `${label} · ${list.length}`;
    }
}
