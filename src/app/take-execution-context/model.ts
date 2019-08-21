type ExecutionEventType = 'Loading' | 'Receive' | 'Error';

export interface ExecutionEvent {
    type: ExecutionEventType;
}

export interface ExecutionLoadingEvent extends ExecutionEvent {
    type: 'Loading';
    isLoading: boolean;
}

export interface ExecutionReceiveEvent<T> extends ExecutionEvent {
    type: 'Receive';
    value: T;
}

export interface ExecutionErrorEvent<E> extends ExecutionEvent {
    type: 'Error';
    error: E;
}

export type ExecutionContext<T, E = any> = ExecutionLoadingEvent | ExecutionReceiveEvent<T> | ExecutionErrorEvent<E>;
