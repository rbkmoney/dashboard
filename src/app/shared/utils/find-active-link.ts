import { Link } from '../models';

interface ActivePathsCount {
    count: number;
    length: number;
}

function countActivePaths(url: string, paths: string[]): ActivePathsCount {
    const [urlPath] = url.split(/[?#]/);
    return paths.reduce<ActivePathsCount>(
        ({ count, length }, p) =>
            urlPath.indexOf(p) === 0 ? { count: ++count, length: length + p.length } : { count, length },
        { count: 0, length: 0 }
    );
}

function countExactPath(url: string, path: string): ActivePathsCount {
    return path === url ? { count: 1, length: path.length } : { count: 0, length: 0 };
}

export function findActivePath(url: string, links: Link[]): Link {
    return links.reduce<[Link, ActivePathsCount]>(
        (max, link) => {
            const [, { count: maxCount, length: maxLength }] = max;
            const { count, length } = link.activateStartPaths?.length
                ? countActivePaths(url, link.activateStartPaths)
                : countExactPath(url, link.path);
            return !count || maxCount > count || (maxCount === count && maxLength > length)
                ? max
                : [link, { count, length }];
        },
        [null, { count: 0, length: 0 }]
    )[0];
}
