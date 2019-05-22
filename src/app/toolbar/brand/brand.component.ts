import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
    @Input() navigationLink = '/';
}
