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

export interface ExecutionErrorEvent<T> extends ExecutionEvent {
    type: 'Error';
    error: T;
}

export type ExecutionContext<T> = ExecutionLoadingEvent | ExecutionReceiveEvent<T> | ExecutionErrorEvent<any>;
