import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import isNil from 'lodash.isnil';

@Component({
    selector: 'dsh-headline',
    templateUrl: 'headline.component.html',
    styleUrls: ['headline.component.scss'],
})
export class HeadlineComponent {
    @Input() backRouterLink: any[] | string;

    constructor(private location: Location) {}

    get isRouterLink() {
        return !isNil(this.backRouterLink);
    }

    get isLocationBack() {
        // 1 and 2 is default history length
        return !this.isRouterLink && window.history.length > 2;
    }

    back() {
        this.location.back();
    }
}
