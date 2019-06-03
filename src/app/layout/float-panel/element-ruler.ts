import { Injectable, NgZone } from '@angular/core';
import { auditTime } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

class Sizes {
    top = 0;
    right = 0;
    bottom = 0;
    left = 0;

    get width() {
        return this.right - this.left;
    }

    get height() {
        return this.bottom - this.top;
    }
}

export class ElementRulerRef {
    get sizes(): Sizes {
        return this.change.value;
    }
    private change: BehaviorSubject<Sizes> = new BehaviorSubject(new Sizes());
    private animationFrameId: number;

    constructor(public node) {
        this.update();
    }

    watchOnFrame = () => {
        this.update();
        this.animationFrameId = requestAnimationFrame(this.watchOnFrame);
    };

    watch(throttleTime: number = 150): Observable<Sizes> {
        const obs = this.change.asObservable();
        return throttleTime > 0 ? obs.pipe(auditTime(throttleTime)) : obs;
    }

    update() {
        if (this.node) {
            const nextSizes = this.node.getBoundingClientRect();
            if (
                this.sizes.top !== nextSizes.top ||
                this.sizes.right !== nextSizes.right ||
                this.sizes.bottom !== nextSizes.bottom ||
                this.sizes.left !== nextSizes.left
            ) {
                this.sizes.top = nextSizes.top;
                this.sizes.right = nextSizes.right;
                this.sizes.bottom = nextSizes.bottom;
                this.sizes.left = nextSizes.left;
                this.change.next(this.sizes);
            }
        }
    }

    dispose() {
        cancelAnimationFrame(this.animationFrameId);
        this.change.complete();
    }
}

@Injectable()
export class ElementRuler {
    constructor(private zone: NgZone) {}

    create<T extends HTMLElement>(node: T): ElementRulerRef {
        const watcher = new ElementRulerRef(node);
        this.zone.runOutsideAngular(watcher.watchOnFrame);
        return watcher;
    }
}
