import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'activeClass' })
export class ActiveClassPipe implements PipeTransform {
    transform(value: string, predicate: boolean): string {
        return predicate ? ' ' + value.trim() : '';
    }
}
