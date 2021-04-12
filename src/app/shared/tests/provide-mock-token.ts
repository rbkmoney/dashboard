import { InjectionToken } from '@angular/core';

export function provideMockToken<T>(
    token: InjectionToken<T>,
    value: T = null
): {
    provide: InjectionToken<T>;
    useValue: T;
} {
    return {
        provide: token,
        useValue: value,
    };
}
