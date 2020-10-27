import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

export interface Link {
    id?: string;
    name?: string;
    path: string;
    activateStartPaths?: string[];
    disabled?: boolean;
}

const ENV_PATH_PART = 'env';

@Injectable()
export class NavigationService {
    url$ = this.router.events.pipe(
        startWith(null),
        map(() => (this.router.url || '').slice(1)),
        distinctUntilChanged(),
        shareReplay(1)
    );
    env$ = this.url$.pipe(
        map((url) => {
            const parts = url.split('/');
            const envPartIdx = parts.findIndex((p) => p === ENV_PATH_PART);
            return envPartIdx !== -1 ? parts[envPartIdx + 1] : undefined;
        }),
        distinctUntilChanged(),
        shareReplay(1)
    );

    constructor(private router: Router) {}

    private countActivePaths(url: string, paths: string[]) {
        return paths.reduce<{ count: number; length: number }>(
            ({ count, length }, p) =>
                url.indexOf(p) === 0 ? { count: ++count, length: length + p.length } : { count, length },
            { count: 0, length: 0 }
        );
    }

    private findLinkWithMaxActivePathsByUrl(url: string, links: Link[]) {
        return links.reduce<[Link, { count: number; length: number }]>(
            (max, link) => {
                const [, { count: maxCount, length: maxLength }] = max;
                const { count, length } = this.countActivePaths(url, link.activateStartPaths || []);
                return !count || maxCount > count || (maxCount === count && maxLength > length)
                    ? max
                    : [link, { count, length }];
            },
            [null, { count: 0, length: 0 }]
        )[0];
    }

    findLinkWithMaxActivePaths(links: Link[]): Observable<Link> {
        return this.url$.pipe(map((url) => this.findLinkWithMaxActivePathsByUrl(url, links)));
    }
}
