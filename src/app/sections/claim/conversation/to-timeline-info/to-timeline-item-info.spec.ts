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
                createdAt: '2019-08-08T10:20:30Z' as any,
                modification: {
                    modificationType: 'ClaimModification',
                    modification: {}
                }
            }
        ];
        expect(() => toTimelineItemInfo(modification)).toThrow(new Error('Modification unit is incomplete'));
    });
});
