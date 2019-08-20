import { toTimelineItemInfo } from './to-timeline-item-info';
import { SpecificModificationUnit } from './specific-modification-unit';

describe('toTimelineItemInfo', () => {
    it('empty modifications', () => {
        expect(toTimelineItemInfo([])).toBeUndefined();
    });

    it('not specific modification', () => {
        const modification: SpecificModificationUnit[] = [
            {
                modificationID: 1,
                createdAt: ('01-01-2019' as any) as Date,
                modification: {
                    modificationType: 'ClaimModification',
                    modification: {}
                }
            }
        ];
        expect(() => toTimelineItemInfo(modification)).toThrow(new Error('Modification unit is incomplete'));
    });
});
