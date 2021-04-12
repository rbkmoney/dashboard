import { instance, mock } from 'ts-mockito';

export function provideMockService<T extends new (...args: any) => any>(
    service: T,
    mockedService?: InstanceType<T>
): {
    provide: T;
    useFactory: () => InstanceType<T>;
} {
    return {
        provide: service,
        useFactory: () => instance(mockedService ?? mock(service)),
    };
}
