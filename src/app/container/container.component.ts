import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BrandType } from './brand/brand-type';

@Component({
    selector: 'dsh-container',
    templateUrl: 'container.component.html',
    styleUrls: ['container.component.scss']
})
export class ContainerComponent {
    constructor(private router: Router) {}

    isMainPage(): boolean {
        return this.router.url === '/';
    }

    brandType(): BrandType {
        return this.isMainPage() ? BrandType.invert : BrandType.normal;
    }
}
