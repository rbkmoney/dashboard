import { Link } from '../models';

interface ActivePathsCount {
    count: number;
    length: number;
}

function countActivePaths(url: string, paths: string[]): ActivePathsCount {
    return paths.reduce<ActivePathsCount>(
        ({ count, length }, p) =>
            url.indexOf(p) === 0 ? { count: ++count, length: length + p.length } : { count, length },
        { count: 0, length: 0 }
    );
}

export function findActivePath(url: string, links: Link[]): Link {
    return links.reduce<[Link, ActivePathsCount]>(
        (max, link) => {
            const [, { count: maxCount, length: maxLength }] = max;
            const { count, length } = countActivePaths(url, link.activateStartPaths || []);
            return !count || maxCount > count || (maxCount === count && maxLength > length)
                ? max
                : [link, { count, length }];
        },
        [null, { count: 0, length: 0 }]
    )[0];
}
