import isEmpty from 'lodash.isempty';
import last from 'lodash.last';
import negate from 'lodash.negate';
import { combineLatest, iif, merge, Observable, of } from 'rxjs';
import { filter, first, map, pluck, reduce, switchMap } from 'rxjs/operators';

import {
    BankAccount,
    ContactInfo,
    LegalOwnerInfo,
    QuestionaryData,
    RussianIndividualEntity,
    RussianLegalEntity,
    ShopInfo,
} from '../../../api-codegen/questionary';
import { OrgInfo } from './org-info';

const toPanelItem = <T>(type: PanelInfoType) => (s: Observable<T>): Observable<PanelInfo | null> =>
    s.pipe(
        map((item) => (item ? { type, item } : null)),
        first()
    );

const toOrgInfo = (s: Observable<RussianLegalEntity | RussianIndividualEntity | null>): Observable<OrgInfo | null> =>
    s.pipe(
        switchMap((entity) =>
            iif(
                () => isEmpty(entity),
                of(null),
                of(entity).pipe(
                    map(({ additionalInfo, name, inn, registrationInfo }) => ({
                        additionalInfo,
                        name,
                        inn,
                        registrationInfo,
                    }))
                )
            )
        )
    );

export type PanelInfoType =
    | 'shopInfo'
    | 'bankAccountInfo'
    | 'legalOwnerInfo'
    | 'individualEntityInfo'
    | 'orgInfo'
    | 'contactInfo';

export interface PanelInfo {
    type: PanelInfoType;
    item: ShopInfo | BankAccount | LegalOwnerInfo | RussianIndividualEntity | OrgInfo | ContactInfo;
}

export const toPanelInfo = (s: Observable<QuestionaryData>): Observable<PanelInfo[]> => {
    const individualEntityItem$ = s.pipe(pluck('contractor', 'individualEntity'), toPanelItem('individualEntityInfo'));
    const shopInfoItem$ = s.pipe(pluck('shopInfo'), toPanelItem('shopInfo'));
    const legalOwnerInfoItem$ = s.pipe(
        pluck('contractor', 'legalEntity', 'legalOwnerInfo'),
        toPanelItem('legalOwnerInfo')
    );
    const bankAccountItem$ = s.pipe(pluck('bankAccount'), toPanelItem('bankAccountInfo'));
    const contactInfoItem$ = s.pipe(pluck('contactInfo'), toPanelItem('contactInfo'));
    const orgInfoItem$ = combineLatest([
        s.pipe(pluck('contractor', 'legalEntity')),
        s.pipe(pluck('contractor', 'individualEntity')),
    ]).pipe(
        map((entities) => entities.filter(negate(isEmpty))),
        map(last),
        toOrgInfo,
        toPanelItem('orgInfo')
    );
    return merge(
        orgInfoItem$,
        individualEntityItem$,
        legalOwnerInfoItem$,
        shopInfoItem$,
        bankAccountItem$,
        contactInfoItem$
    ).pipe(
        filter(negate(isEmpty)),
        reduce((a, c) => [...a, c], [])
    );
};
