export type Serializer<T = unknown> = {
    id: string;
    serialize: (v: T) => string;
    deserialize: (v: string) => T;
    recognize: (v: T) => boolean;
};
