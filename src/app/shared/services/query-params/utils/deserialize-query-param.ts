import { Serializer } from '../types/serializer';
import { swapQuotes } from './swap-quotes';

export function deserializeQueryParam<P>(value: string, serializers: Serializer[] = []): P {
    const serializer = serializers.find((s) => value.startsWith(s.id));
    return (
        serializer ? serializer.deserialize(value.slice(serializer.id.length)) : JSON.parse(swapQuotes(value || ''))
    ) as P;
}
