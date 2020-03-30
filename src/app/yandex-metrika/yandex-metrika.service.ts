import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Metrika } from 'ng-yandex-metrika';
import { Subscription } from 'rxjs';
import { filter, map, pairwise, startWith, tap } from 'rxjs/operators';

@Injectable()
export class YandexMetrikaService implements OnDestroy {
    private subscription: Subscription;

    constructor(private router: Router, private location: Location, private metrika: Metrika) {
        this.subscription = this.hitRouterEvents().subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    hitRouterEvents() {
        return this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.location.path()),
            startWith(null as string),
            map(path => (path === '' ? '/' : path)),
            pairwise(),
            tap(([prevPath, newPath]) => {
                this.metrika.hit(
                    newPath,
                    prevPath === null
                        ? undefined
                        : {
                              referer: prevPath
                          }
                );
            })
        );
    }
}
