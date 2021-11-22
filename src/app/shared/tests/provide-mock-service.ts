import { instance, mock } from 'ts-mockito';

export function provideMockService<T extends new (...args: unknown[]) => unknown>(
    service: T,
    mockedService?: InstanceType<T>
): {
    provide: T;
    useFactory: () => InstanceType<T>;
} {
    return {
        provide: service,
        useFactory: () => instance<InstanceType<T>>(mockedService ?? mock(service)),
    };
}
