import { Subscription } from 'rxjs';

export function ignoreBeforeCompletion<P extends PropertyKey, C extends { [N in P]: (...args: any[]) => Subscription }>(
    target: C,
    propertyKey: P,
    descriptor: PropertyDescriptor
) {
    let lastSubscription: Subscription;
    const original = descriptor.value;
    descriptor.value = function (...args) {
        if (!lastSubscription || lastSubscription?.closed) {
            lastSubscription = original.call(this, ...args);
        }
        return lastSubscription;
    };
}
