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
        return this.change.value;
    }
    private change: BehaviorSubject<Size> = new BehaviorSubject(new Size());
    private animationFrameId: number;

    constructor(public node?: T) {
        this.updateSize();
    }

    watchOnFrame = () => {
        this.updateSize();
        this.animationFrameId = requestAnimationFrame(this.watchOnFrame);
    };

    watch(throttleTime: number = 100): Observable<Size> {
        const obs = this.change.asObservable();
        return throttleTime > 0 ? obs.pipe(auditTime(throttleTime)) : obs;
    }

    updateNode(node: T) {
        this.node = node;
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
                this.change.next(this.value);
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

    create<T extends HTMLElement>(node?: T): ElementRulerRef {
        const watcher = new ElementRulerRef(node);
        this.zone.runOutsideAngular(watcher.watchOnFrame);
        return watcher;
    }
}
