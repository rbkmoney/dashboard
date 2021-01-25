import { Subject, Subscription } from 'rxjs';

export function inProgressTo<T extends PropertyKey>(observableKey: T) {
    // tslint:disable-next-line: only-arrow-functions
    return function <P extends PropertyKey,
        C extends { [N in P]: (...args: any[]) => Subscription } & { [N in T]: Subject<boolean> }>(target: C, propertyKey: P, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        let count = 0;
        descriptor.value = function(...args) {
            count += 1;
            this[observableKey].next(!!count);
            const subscription: Subscription = original.call(this, ...args);
            subscription.add(() => {
                count -= 1;
                this[observableKey].next(!!count);
            });
            return subscription;
        };
    };
}
