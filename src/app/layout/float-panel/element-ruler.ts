import { Injectable, NgZone } from '@angular/core';
import { auditTime } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

interface Sizes {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    width: number;
    height: number;
}

export interface ElementRulerRef {
    change: Observable<Sizes>;
    value: Sizes;
    dispose(): void;
}

@Injectable()
export class ElementRuler {
    constructor(private zone: NgZone) {}

    create<T extends HTMLElement>(node: T, throttleTime = 100): ElementRulerRef {
        const sizes: Sizes = {
            get width() {
                return sizes.right - sizes.left;
            },
            get height() {
                return sizes.bottom - sizes.top;
            }
        };
        let animationFrameId;

        const _change = new BehaviorSubject({ width: 0, height: 0 });

        const watchOnFrame = () => {
            const nextSizes = node.getBoundingClientRect();
            if (
                sizes.top !== nextSizes.top ||
                sizes.right !== nextSizes.right ||
                sizes.bottom !== nextSizes.bottom ||
                sizes.left !== nextSizes.left
            ) {
                sizes.top = nextSizes.top;
                sizes.right = nextSizes.right;
                sizes.bottom = nextSizes.bottom;
                sizes.left = nextSizes.left;
                _change.next(sizes);
            }
            animationFrameId = requestAnimationFrame(watchOnFrame);
        };

        this.zone.runOutsideAngular(watchOnFrame);

        const dispose = () => {
            cancelAnimationFrame(animationFrameId);
            _change.complete();
        };

        const obs = _change.asObservable();
        const change = throttleTime > 0 ? obs.pipe(auditTime(throttleTime)) : obs;

        return {
            dispose,
            change,
            get value() {
                return sizes;
            }
        };
    }
}
