import { Serializer } from '../types/serializer';

export function serializeQueryParam(value: unknown, serializers: Serializer[] = []): string {
    const serializer = serializers.find((s) => s.recognize(value));
    return serializer ? serializer.id + serializer.serialize(value) : JSON.stringify(value);
}
