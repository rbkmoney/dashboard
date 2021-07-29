import { Serializer } from '../types/serializer';

export function deserializeQueryParam<P>(value: string, serializers: Serializer[] = []): P {
    const serializer = serializers.find((s) => value.startsWith(s.id));
    return (serializer ? serializer.deserialize(value.slice(serializer.id.length)) : JSON.parse(value || '')) as P;
}
