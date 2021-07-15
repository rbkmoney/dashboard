import { Serializer } from '../types/serializer';
import { swapQuotes } from './swap-quotes';

export function serializeQueryParam(value: unknown, serializers: Serializer[] = []): string {
    const serializer = serializers.find((s) => s.recognize(value));
    return serializer ? serializer.id + serializer.serialize(value) : swapQuotes(JSON.stringify(value));
}
