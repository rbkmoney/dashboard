import { createArrayOfLength } from '../../utils';
import { DataSetItemID } from './data-caching.service';

export function generateDatasetItems(length: number): DataSetItemID[] {
    return createArrayOfLength(length).map((_: null, index: number) => {
        return {
            id: `mock_item_${index}`,
        };
    });
}
