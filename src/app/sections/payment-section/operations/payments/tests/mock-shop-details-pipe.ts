import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shopDetails',
})
export class MockShopDetailsPipe implements PipeTransform {
    transform(shopID: string): string {
        return `${shopID}_name`;
    }
}
