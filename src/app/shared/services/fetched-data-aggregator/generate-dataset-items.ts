import { DataSetItemID } from '../../models';
import { createArrayOfLength } from '../../utils';

export function generateDatasetItems(length: number): DataSetItemID[] {
    return createArrayOfLength(length).map((_: null, index: number) => {
        return {
            id: `mock_item_${index}`,
        };
    });
}
