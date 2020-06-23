import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BrandType } from './brand';

@Component({
    selector: 'dsh-container',
    templateUrl: 'container.component.html',
    styleUrls: ['container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
    routerNavigationEnd$: Observable<boolean>;

    constructor(private router: Router) {
        this.routerNavigationEnd$ = router.events.pipe(
            filter((e) => e instanceof NavigationEnd),
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
