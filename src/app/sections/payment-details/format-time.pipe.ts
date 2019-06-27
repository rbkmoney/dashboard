import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { locale } from 'moment';


@Pipe({
    name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

    transform(value: Date, predicate: any): string {
        return formatDate(value, 'dd MMMM yyyy, HH:mm', locale('ru'));
    }

}
