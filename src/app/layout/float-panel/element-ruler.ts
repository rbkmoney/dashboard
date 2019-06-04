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

export class ElementRulerRef {
    get size(): Size {
        return this.change.value;
    }
    private change: BehaviorSubject<Size> = new BehaviorSubject(new Size());
    private animationFrameId: number;

    constructor(public node) {
        this.update();
    }

    watchOnFrame = () => {
        this.update();
        this.animationFrameId = requestAnimationFrame(this.watchOnFrame);
    };

    watch(throttleTime: number = 150): Observable<Size> {
        const obs = this.change.asObservable();
        return throttleTime > 0 ? obs.pipe(auditTime(throttleTime)) : obs;
    }

    update() {
        if (this.node) {
            const nextSize = this.node.getBoundingClientRect();
            if (
                this.size.top !== nextSize.top ||
                this.size.right !== nextSize.right ||
                this.size.bottom !== nextSize.bottom ||
                this.size.left !== nextSize.left
            ) {
                this.size.top = nextSize.top;
                this.size.right = nextSize.right;
                this.size.bottom = nextSize.bottom;
                this.size.left = nextSize.left;
                this.change.next(this.size);
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
