import { Injectable, NgZone } from '@angular/core';
import { auditTime } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export class Size {
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

export class ElementRulerRef<T extends HTMLElement = HTMLElement> {
    get value(): Size {
        return this.value$.value;
    }

    node: T;

    value$: BehaviorSubject<Size> = new BehaviorSubject(new Size());

    private animationFrameId: number;

    constructor(node: T | (() => T)) {
        this.setNode(node);
    }

    watchOnFrame = () => {
        this.updateSize();
        this.animationFrameId = requestAnimationFrame(this.watchOnFrame);
    };

    watch(throttleTime: number = 200): Observable<Size> {
        const obs = this.value$.asObservable();
        return throttleTime > 0 ? obs.pipe(auditTime(throttleTime)) : obs;
    }

    setNode(node: T | (() => T)) {
        if (typeof node === 'function') {
            delete this.node;
            Object.defineProperty(this, 'node', { get: node });
        } else {
            this.node = node;
        }
        this.updateSize();
    }

    updateSize() {
        if (this.node) {
            const nextSize = this.node.getBoundingClientRect();
            if (
                this.value.top !== nextSize.top ||
                this.value.right !== nextSize.right ||
                this.value.bottom !== nextSize.bottom ||
                this.value.left !== nextSize.left
            ) {
                this.value.top = nextSize.top;
                this.value.right = nextSize.right;
                this.value.bottom = nextSize.bottom;
                this.value.left = nextSize.left;
                this.value$.next(this.value);
            }
        }
    }

    dispose() {
        cancelAnimationFrame(this.animationFrameId);
        this.value$.complete();
    }
}

@Injectable()
export class ElementRuler {
    constructor(private zone: NgZone) {}

    create<T extends HTMLElement>(node?: T): ElementRulerRef {
        const watcher = new ElementRulerRef(node);
        this.zone.runOutsideAngular(watcher.watchOnFrame);
        return watcher;
    }
}
