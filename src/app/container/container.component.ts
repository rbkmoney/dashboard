import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BrandType } from './brand/brand-type';

@Component({
    selector: 'dsh-container',
    templateUrl: 'container.component.html',
    styleUrls: ['container.component.scss']
})
export class ContainerComponent {
    routerNavigationEnd: Observable<boolean>;

    constructor(private router: Router) {
        this.routerNavigationEnd = router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            map(() => true)
        );
    }

    isRoot(): boolean {
        return this.router.url === '/';
    }

    brandType(): BrandType {
        return this.isRoot() ? BrandType.invert : BrandType.normal;
    }
}
